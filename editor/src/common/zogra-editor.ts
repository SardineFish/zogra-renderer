import { ZograEngine, Camera, vec3, Entity, rgb, EventEmitter, EventDefinitions, IEventSource, EventKeys, InputManager, IAsset, Time } from "zogra-renderer";
import { initCamera } from "./camera-controller";
import { initTools } from "./tools";
import { drawEditorOverlay } from "./editor-overlay";
import { initEditorAssets } from "./assets/assets";
import { initEditorInput } from "./control";
import { EditorGLUtils, initGLUtils } from "./gl";
import { initDebug } from "./debug";
import { AssetsFolder, UserAssetsManager } from "./assets/user-assets";
import { LazyEventEmitter } from "../util/utils";
import { loadSampleProject } from "./sample-scene";

interface ZograEditorEvents extends EventDefinitions
{
    "selectchange": (selections: Entity[]) => void;
    "toolchange": (editor: ZograEditor) => void;
    "props-reload": (target: any, name: string | number | null, editor: ZograEditor) => void;
}

export class ZograEditor implements IEventSource<ZograEditorEvents>
{
    engine: ZograEngine;
    eventEmitter = new EventEmitter<ZograEditorEvents>();
    lazyEventEmitter: LazyEventEmitter<ZograEditorEvents>;
    tools: ReturnType<typeof initTools>;
    selectedEntities: Entity[] = [];
    //assets: ReturnType<typeof initEditorAssets>;
    //userAssets: AssetsFolder;
    assets: UserAssetsManager;
    input: InputManager;
    camera: Camera;
    gl: EditorGLUtils;
    constructor(engine: ZograEngine)
    {
        this.engine = engine;
        this.lazyEventEmitter = new LazyEventEmitter(this.eventEmitter, 10);
        this.assets = new UserAssetsManager();
        this.input = initEditorInput(this);
        this.camera = initCamera(this);
        this.gl = initGLUtils(this);
        this.tools = initTools(this);
        initDebug(this);
    }
    init()
    {
        this.engine.start();
        loadSampleProject(this);
        this.camera.on("postrender", () => drawEditorOverlay(this));
        this.engine.on("update", t => this.update(t));
    }
    private update(time: Time)
    {
        this.lazyEventEmitter.update();
    }
    selectEntities(entities: Entity[])
    {
        this.selectedEntities = entities;
        this.eventEmitter.emit("selectchange", entities);
    }
    reloadPropertiesEditor<T, K extends keyof T>(target: T, name?: K)
    {
        this.lazyEventEmitter.emit("props-reload", target, name as number | string | null, this);
    }
    on<T extends EventKeys<ZograEditorEvents>>(event: T, listener: ZograEditorEvents[T])
    {
        this.eventEmitter.on(event, listener);
    }
    off<T extends EventKeys<ZograEditorEvents>>(event: T, listener: ZograEditorEvents[T])
    {
        this.eventEmitter.off(event, listener);
    }
}
