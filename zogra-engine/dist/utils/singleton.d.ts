export declare abstract class Singleton<T extends Singleton<T>> {
    static current: T;
    constructor();
}
