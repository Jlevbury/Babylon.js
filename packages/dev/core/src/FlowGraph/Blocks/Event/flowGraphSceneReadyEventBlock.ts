import type { Nullable } from "../../../types";
import type { Observer } from "../../../Misc/observable";
import type { Scene } from "../../../scene";
import type { FlowGraph } from "../../flowGraph";
import { FlowGraphEventBlock } from "../../flowGraphEventBlock";

/**
 * @experimental
 * Block that triggers when a scene is ready.
 */
export class FlowGraphSceneReadyEventBlock extends FlowGraphEventBlock {
    private _scene: Scene;
    private _sceneReadyObserver: Nullable<Observer<Scene>>;

    constructor(graph: FlowGraph, scene: Scene) {
        super(graph);
        this._scene = scene;
    }

    public _start(): void {
        if (!this._sceneReadyObserver) {
            this._sceneReadyObserver = this._scene.onReadyObservable.add(() => {
                this._execute();
            });
        }
    }

    public _stop() {
        if (this._sceneReadyObserver) {
            this._scene.onReadyObservable.remove(this._sceneReadyObserver);
        }
    }
}
