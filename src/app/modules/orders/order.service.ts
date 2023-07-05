import { User } from "./../user/user.model";
import { Cow } from "./../cow/cow.model";
import mongoose from "mongoose";
import httpStatus from "http-status";
import { IOrders } from "./order.interface";
import ApiError from "../../../errors/ApiError";
import { Order } from "./order.model";

const createOrder = async (order: IOrders): Promise<IOrders | null> => {
	const session = await mongoose.startSession();

	const cow = await Cow.findById(order.cow).session(session);
	if (!cow) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			`Cow with ID ${order.cow} does not exist!`
		);
	}

	if (cow.label === "sold out") {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"The product is already sold out!"
		);
	}

	const buyer = await User.findById(order.buyer).session(session);
	if (!buyer) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			`Buyer with ID ${order.buyer} does not exist!`
		);
	}

	if (Number(buyer.budget) < Number(cow.price)) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"Insufficient funds to buy the cow."
		);
	}

	const updatedBudget = Number(buyer.budget) - Number(cow.price);
	buyer.budget = updatedBudget;
	await buyer.save();

	if (cow.seller) {
		const seller = await User.findById(cow.seller).session(session);
		if (!seller) {
			throw new ApiError(httpStatus.BAD_REQUEST, "Seller not found.");
		}

		const updatedIncome = Number(seller.income) + Number(cow.price);
		seller.income = updatedIncome;
		await seller.save();
	}

	session.startTransaction();

	try {
		cow.label = "sold out";
		await cow.save();

		const orderData: IOrders = {
			cow: order.cow,
			buyer: order.buyer,
			seller: order.seller,
		};
		const confirmOrder = await Order.create([orderData], { session });

		if (!confirmOrder || confirmOrder.length === 0) {
			throw new ApiError(httpStatus.BAD_REQUEST, "confirm order not create");
		}

		await session.commitTransaction();
		await session.endSession();

		return confirmOrder[0];
	} catch (error) {
		await session.abortTransaction();
		await session.endSession();
		throw error;
	}
};

const getAllOrder = async (): Promise<IOrders[] | null> => {
	const result = await Order.find({}).populate("cow").populate("buyer");
	return result;
};

export const OrderService = {
	createOrder,
	getAllOrder,
};
