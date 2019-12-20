export interface IModule { }

export interface IContentAdapter extends IModule {
    attachFeature(feature: IFeature): void;
    detachFeature(feature: IFeature): void;
}

export interface IFeature extends IModule {
    contextIds?: string[];
    orderIndex?: number;

    config: any;
    activate(): void;
    deactivate(): void;
}

export interface IResolver extends IModule {
    getBranch(): string;
}

export interface IAction { }

export interface IView {
    name: string;
    isActive: boolean;
    INSERT_POINTS: ID[];
    attachActionFactories(actions: IAction[], insPoint: ID): void;
    activate(doc: Document): void;
    deactivate(doc: Document): void;
}
export type ID = string;

declare global {

    export function Inject(name: string): Function;

    export var Core: {
        sendWalletConnectTx: (dappletId: string, metadata: any, callback: (e: { type: string, data?: any }) => void) => Promise<any>,
        connect: (url: string) => Connection,
        overlay: (url: string, title: string) => Overlay,
        contextStarted(contextIds: string[], parentContext?: string),
        contextFinished(contextIds: string[], parentContext?: string)
    };

    export class Connection {
        subscribe: (id: string, handler: (message: any) => void) => void
        // ToDo: add publish
    }

    export class Overlay {
        subscribe: (topic: string, handler: Function, threading?: SubscribeOptions) => void
        unsubscribe: (topic: string) => void;
        publish: (topic: string, ...args: any) => void
        open: (callback?: Function) => void
        close: () => void
        toggle: () => void
        isOpened: boolean
        // ToDo: do we need show/hide methods?
    }

    export enum SubscribeOptions {
        SINGLE_THREAD,
        MULTI_THREAD
    }

    export function Injectable(constructor: Function);
}