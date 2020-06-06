import { ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
export declare class ProductSaga {
    productWasAdded: (events$: Observable<any>) => Observable<ICommand>;
}
