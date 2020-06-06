import { Message } from './types/message.type';
export interface PublisherInterface {
    publish(message: Message): Promise<boolean>;
}
