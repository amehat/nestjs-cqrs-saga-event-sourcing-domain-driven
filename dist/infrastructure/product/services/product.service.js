"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const register_product_command_1 = require("../commands/register-product.command");
const get_all_products_query_1 = require("../queries/get-all-products.query");
const modification_product_command_1 = require("../commands/modification-product.command");
const get_by_sku_product_query_1 = require("../queries/get-by-sku-product.query");
const remove_product_command_1 = require("../commands/remove-product.command");
const create_product_sheet_projection_command_1 = require("../projections/create-product-sheet.projection.command");
let ProductService = class ProductService {
    constructor(commandBus, queryBus) {
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
    productRegistration(name, sku, price, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commandBus.execute(new register_product_command_1.RegisterProductCommand(name, sku, price, currency));
        });
    }
    productModification(name, sku, price, currency) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commandBus.execute(new modification_product_command_1.ModificationProductCommand(name, sku, price, currency));
        });
    }
    removeProduct(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.commandBus.execute(new remove_product_command_1.RemoveProductCommand(sku));
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryBus.execute(new get_all_products_query_1.GetAllProductsQuery());
        });
    }
    getBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryBus.execute(new get_by_sku_product_query_1.GetBySkuProductQuery(sku));
        });
    }
    subscribe(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log(msg, 'subscribe msg');
            return;
            return this.commandBus.execute(new create_product_sheet_projection_command_1.CreateProductSheetProjectionCommand(msg.eventId, msg.payload));
        });
    }
};
__decorate([
    rabbitmq_1.RabbitSubscribe({
        exchange: 'exchange-eventstore',
        routingKey: 'product.registerProduct',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductService.prototype, "subscribe", null);
ProductService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        cqrs_1.QueryBus])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map