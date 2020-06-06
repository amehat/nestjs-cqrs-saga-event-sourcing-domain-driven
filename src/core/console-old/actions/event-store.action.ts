import { AbstractAction } from './abstract.action';
import { Input } from '../commands';

export class EventStoreAction extends AbstractAction {
    public async handle() {
        console.log('event-store replay');
    }
}
