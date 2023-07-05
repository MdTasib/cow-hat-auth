import { userRoles } from "./user.constant";
import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>(
	{
		password: { type: String, required: true },
		role: {
			type: String,
			required: true,
			enum: userRoles,
			default: "seller",
		},
		name: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
		},
		phoneNumber: { type: String, required: true },
		address: { type: String, required: true },
		budget: { type: Number, required: true, default: 0 },
		income: { type: Number, required: true, default: 0 },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

userSchema.statics.isUserExist = async function (
	phoneNumber: string
): Promise<Pick<IUser, "phoneNumber" | "password" | "role" | "id"> | null> {
	return await User.findOne(
		{ phoneNumber },
		{ phoneNumber: 1, password: 1, role: 1, id: 1 }
	);
};

userSchema.statics.isPasswordMatched = async function (
	givenPassword: string,
	savedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre("save", async function (next) {
	const user = this;
	user.password = await bcrypt.hash(
		user.password,
		Number(config.bcrypt_salt_rounds)
	);

	next();
});

export const User = model<IUser, UserModel>("User", userSchema);
