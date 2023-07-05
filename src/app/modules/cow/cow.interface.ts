import { Model, Types } from "mongoose";

export type ICowLocations =
	| "Dhaka"
	| "Chattogram"
	| "Barishal"
	| "Rajshahi"
	| "Sylhet"
	| "Comilla"
	| "Rangpur"
	| "Mymensingh";

export type ICowBreed =
	| "Brahman"
	| "Nellore"
	| "Sahiwal"
	| "Gir"
	| "Indigenous"
	| "Tharparkar"
	| "Kankrej";

export type ICowLabel = "for sale" | "sold out";

export type ICowCategory = "Dairy" | "Beef" | "DualPurpose";

export type ICow = {
	name: string;
	age: number;
	price: number;
	location: ICowLocations;
	breed: string;
	weight: number;
	label: ICowLabel;
	category: ICowCategory;
	seller: Types.ObjectId;
};
export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
	searchTerm?: string;
	location?: string;
};
