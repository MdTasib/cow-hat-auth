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
exports.OrderService = void 0;
const user_model_1 = require("./../user/user.model");
const cow_model_1 = require("./../cow/cow.model");
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const order_model_1 = require("./order.model");
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const cow = yield cow_model_1.Cow.findById(order.cow).session(session);
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Cow with ID ${order.cow} does not exist!`);
    }
    if (cow.label === "sold out") {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "The product is already sold out!");
    }
    const buyer = yield user_model_1.User.findById(order.buyer).session(session);
    if (!buyer) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Buyer with ID ${order.buyer} does not exist!`);
    }
    if (Number(buyer.budget) < Number(cow.price)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Insufficient funds to buy the cow.");
    }
    const updatedBudget = Number(buyer.budget) - Number(cow.price);
    buyer.budget = updatedBudget;
    yield buyer.save();
    if (cow.seller) {
        const seller = yield user_model_1.User.findById(cow.seller).session(session);
        if (!seller) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Seller not found.");
        }
        const updatedIncome = Number(seller.income) + Number(cow.price);
        seller.income = updatedIncome;
        yield seller.save();
    }
    session.startTransaction();
    try {
        cow.label = "sold out";
        yield cow.save();
        const orderData = {
            cow: order.cow,
            buyer: order.buyer,
            seller: order.seller,
        };
        const confirmOrder = yield order_model_1.Order.create([orderData], { session });
        if (!confirmOrder || confirmOrder.length === 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "confirm order not create");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return confirmOrder[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({}).populate("cow").populate("buyer");
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrder,
};
