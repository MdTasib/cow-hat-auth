import {
	ICowBreed,
	ICowCategory,
	ICowLabel,
	ICowLocations,
} from "./cow.interface";

export const cowLocations: ICowLocations[] = [
	"Dhaka",
	"Chattogram",
	"Barishal",
	"Rajshahi",
	"Sylhet",
	"Comilla",
	"Rangpur",
	"Mymensingh",
];

export const cowLabel: ICowLabel[] = ["for sale", "sold out"];

export const cowCategory: ICowCategory[] = ["Dairy", "Beef", "DualPurpose"];

export const CowFilterableFields = [
	"searchTerm",
	"location",
	"name",
	"price",
	"breed",
];

export const cowBreed: ICowBreed[] = [
	"Brahman",
	"Nellore",
	"Sahiwal",
	"Gir",
	"Indigenous",
	"Tharparkar",
	"Kankrej",
];

export const CowSearchableFields = ["location", "price", "name", "breed"];
