import { Model, Types } from "mongoose";
import { IUser } from "./../user/user.interface";
import { ICow } from "./../cow/cow.interface";

export type IOrders = {
	cow: Types.ObjectId | ICow;
	buyer: Types.ObjectId | IUser;
	seller: Types.ObjectId | IUser;
};

export type OrdersModel = Model<IOrders, Record<string, unknown>>;
