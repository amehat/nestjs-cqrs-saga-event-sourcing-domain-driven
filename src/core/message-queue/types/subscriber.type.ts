import { Message } from './message.type';

export type Subscriber = (message: Message) => void;
