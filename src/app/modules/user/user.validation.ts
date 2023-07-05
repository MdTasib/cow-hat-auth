import { z } from "zod";
import { userRoles } from "./user.constant";

const createUserZodSchema = z.object({
	body: z.object({
		password: z.string({
			required_error: "Password is required",
		}),
		role: z.enum([...userRoles] as [string, ...string[]], {
			required_error: "Role is required",
		}),
		name: z.object({
			firstName: z.string({
				required_error: "First name is required",
			}),
			lastName: z.string({
				required_error: "Last name is required",
			}),
		}),
		phoneNumber: z.string({
			required_error: "Phone No. is required",
		}),
		address: z.string({
			required_error: "Address is required",
		}),
		budget: z.number({
			required_error: "Budget is required",
		}),
		income: z.number({
			required_error: "income is required",
		}),
	}),
});
const updateUserZodSchema = z.object({
	body: z.object({
		password: z
			.string({
				required_error: "Password is required",
			})
			.optional(),
		role: z
			.enum([...userRoles] as [string, ...string[]], {
				required_error: "Role is required",
			})
			.optional(),
		name: z
			.object({
				firstName: z.string({
					required_error: "First name is required",
				}),
				lastName: z.string({
					required_error: "Last name is required",
				}),
			})
			.optional(),
		phoneNumber: z
			.string({
				required_error: "Phone No. is required",
			})
			.optional(),
		address: z
			.string({
				required_error: "Address is required",
			})
			.optional(),
		budget: z
			.number({
				required_error: "Budget is required",
			})
			.optional(),
		income: z
			.number({
				required_error: "income is required",
			})
			.optional(),
	}),
});

export const UserValidation = {
	createUserZodSchema,
	updateUserZodSchema,
};
