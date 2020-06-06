import { RegisterProductHandler } from './register-product.handler';
import { ModificationProductHandler } from './modification-product.handler';
import { RemoveProductHandler } from './remove-product.handler';
export declare const CommandHandlers: (typeof RegisterProductHandler | typeof ModificationProductHandler | typeof RemoveProductHandler)[];
export { RegisterProductHandler };
