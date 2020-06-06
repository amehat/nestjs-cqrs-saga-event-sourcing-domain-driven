import { ICommandHandler } from '@nestjs/cqrs';
import { CreateProductSheetProjectionCommand } from '../create-product-sheet.projection.command';
export declare class CreateProductSheetProjectionHandler implements ICommandHandler<CreateProductSheetProjectionCommand> {
    execute(command: CreateProductSheetProjectionCommand): Promise<any>;
}
