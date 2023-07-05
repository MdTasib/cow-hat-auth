import express from "express";
import { OrderController } from "./order.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/", auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder);
router.get(
	"/",
	auth(
		ENUM_USER_ROLE.SUPER_ADMIN,
		ENUM_USER_ROLE.ADMIN,
		ENUM_USER_ROLE.BUYER,
		ENUM_USER_ROLE.SELLER
	),
	OrderController.getAllOrder
);
export const OrderRoutes = router;
