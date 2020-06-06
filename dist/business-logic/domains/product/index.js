"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_product_handler_1 = require("./register-product.handler");
exports.RegisterProductHandler = register_product_handler_1.RegisterProductHandler;
const modification_product_handler_1 = require("./modification-product.handler");
const remove_product_handler_1 = require("./remove-product.handler");
exports.CommandHandlers = [modification_product_handler_1.ModificationProductHandler, register_product_handler_1.RegisterProductHandler, remove_product_handler_1.RemoveProductHandler];
//# sourceMappingURL=index.js.map