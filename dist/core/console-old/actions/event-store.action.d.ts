import { AbstractAction } from './abstract.action';
export declare class EventStoreAction extends AbstractAction {
    handle(): Promise<void>;
}
