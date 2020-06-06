export class CreateProductSheetProjectionCommand {
  public constructor(public readonly eventId: string, public readonly payload: { sku: string, name: string, price: number, currency: string }) {
    console.log('event id', eventId);
  }
}
