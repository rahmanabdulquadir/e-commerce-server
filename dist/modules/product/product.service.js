"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
const createProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
const getProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        query = { name: { $regex: searchTerm, $options: 'i' } }; // Case-insensitive search
    }
    const result = yield product_model_1.Product.find(query);
    return result;
});
const getProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: id });
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const result = yield product_model_1.Product.findByIdAndDelete(objectId);
        return result;
    }
    catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductInDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.default.Types.ObjectId(id);
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(objectId, { $set: productData }, { new: true, runValidators: true });
        return updatedProduct;
    }
    catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
});
exports.ProductServices = {
    createProduct,
    getProducts,
    getProductFromDB,
    deleteProductFromDB,
    updateProductInDB,
};
