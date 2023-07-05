import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { cowCategory, cowLabel, cowLocations } from "./cow.constant";

const cowSchema = new Schema<ICow>(
	{
		name: { type: String, required: true },
		age: { type: Number, required: true },
		price: { type: Number, required: true },
		location: {
			type: String,
			required: true,
			enum: cowLocations,
		},
		breed: { type: String, required: true },
		weight: { type: Number, required: true },
		label: {
			type: String,
			required: true,
			enum: cowLabel,
			default: "for sale",
		},
		category: {
			type: String,
			required: true,
			enum: cowCategory,
		},
		seller: { type: Schema.Types.ObjectId },
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);
export const Cow = model<ICow, CowModel>("Cow", cowSchema);
