import { ZograEngine, Camera, vec3, Entity, rgb, EventEmitter, EventDefinitions, IEventSource, EventKeys, InputManager, IAsset, Time, Scene } from "zogra-renderer";
import { initTools } from "./tools";
import { drawEditorOverlay } from "./editor-overlay";
import { initEditorAssets } from "./assets/assets";
import { initEditorInput } from "./control";
import { EditorGLUtils, initGLUtils } from "./gl";
import { initDebug } from "./debug";
import { AssetsFolder, UserAssetsManager } from "./assets/user-assets";
import { LazyEventEmitter } from "../util/utils";
import { loadProject, resetProject } from "./example-scene";
import { EditorEntity } from "./editor-entities";
import { saveLocalProject, loadLocalProejct } from "./serialization/save-load";

interface ZograEditorEvents extends EventDefinitions
{
    "selectchange": (selections: Entity[]) => void;
    "toolchange": (editor: ZograEditor) => void;
    "props-reload": (target: any, name: string | number | null, editor: ZograEditor) => void;
    "editor-reload": (editor: ZograEditor) => void;
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
    editorEntity: EditorEntity;
    gl: EditorGLUtils;
    get camera() { return this.editorEntity.camera };
    constructor(engine: ZograEngine)
    {
        this.engine = engine;
        this.lazyEventEmitter = new LazyEventEmitter(this.eventEmitter, 10);
        this.assets = new UserAssetsManager();
        this.input = initEditorInput(this);
        this.editorEntity = new EditorEntity(this);
        this.gl = initGLUtils(this);
        this.tools = initTools(this);
        initDebug(this);
    }
    init()
    {
        this.engine.start();
        this.camera.on("postrender", () => drawEditorOverlay(this));
        this.engine.on("update", t => this.update(t));
        this.engine.on("scene-change", (s, p) => this.sceneChange(s, p));
        loadProject(this);
    }
    private update(time: Time)
    {
        this.lazyEventEmitter.update();
    }
    private sceneChange(scene: Scene, previous: Scene)
    {
        previous.remove(this.editorEntity);
        scene.add(this.editorEntity);
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
    reload()
    {
        this.eventEmitter.emit("editor-reload", this);
    }
    save(name: string)
    {
        saveLocalProject(this, name);
    }
    async load(name: string)
    {
        await loadLocalProejct(this, name);
    }
    async reset()
    {
        await resetProject(this);
        this.reload();
    }
}
