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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const product_service_1 = require("../services/product.service");
const product_registration_dto_1 = require("../dto/product-registration.dto");
const product_modification_dto_1 = require("../dto/product-modification.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAll() {
        return this.productService.getAll();
    }
    getBySku(sku) {
        return this.productService.getBySku(sku);
    }
    productRegistration(productRegistrationDto) {
        const { name, sku, price, currency } = productRegistrationDto;
        return this.productService.productRegistration(name, sku, price, currency);
    }
    productModification(productModificationDto, sku) {
        const { name, price, currency } = productModificationDto;
        return this.productService.productModification(name, sku, price, currency);
    }
    delete(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productService.removeProduct(sku);
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAll", null);
__decorate([
    common_1.Get(':sku'),
    __param(0, common_1.Param('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getBySku", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_registration_dto_1.ProductRegistrationDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productRegistration", null);
__decorate([
    common_1.Put(':sku'),
    __param(0, common_1.Body()),
    __param(1, common_1.Param('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_modification_dto_1.ProductModificationDto, String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productModification", null);
__decorate([
    common_1.Delete(':sku'),
    __param(0, common_1.Param('sku')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
ProductController = __decorate([
    common_1.Controller('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map