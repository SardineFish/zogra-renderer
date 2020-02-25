import { ConstructorType } from "../utils/util";
import { EventDefinitions, IEventSource, EventKeys } from "./event";
export interface IAsset {
    assetID: number;
    name: string;
    destroy(): void;
}
export declare class Asset implements IAsset {
    assetID: number;
    name: string;
    protected destroyed: boolean;
    constructor(name?: string);
    destroy(): void;
}
interface AssetManagerEvents extends EventDefinitions {
    "asset-created": (asset: IAsset) => void;
    "asset-destroyed": (asset: IAsset) => void;
}
declare class AssetManagerType implements IEventSource<AssetManagerEvents> {
    private assetsMap;
    private id;
    private eventEmitter;
    constructor();
    newAssetID(asset: IAsset): number;
    find(name: string): IAsset | undefined;
    find(id: number): IAsset | undefined;
    destroy(id: number): void;
    findAssetsOfType<T extends IAsset>(type: ConstructorType<T>): T[];
    on<T extends EventKeys<AssetManagerEvents>>(event: T, listener: import("./event").EventListener): void;
    off<T extends EventKeys<AssetManagerEvents>>(event: T, listener: import("./event").EventListener): void;
}
export declare const AssetManager: AssetManagerType;
export {};
