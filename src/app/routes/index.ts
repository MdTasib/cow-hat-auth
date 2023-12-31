import { OrderRoutes } from "./../modules/orders/order.route";
import { CowRoutes } from "./../modules/cow/cow.route";
import express from "express";
import { AuthRoutes } from "./../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/admin/admin.route";
const router = express.Router();

const moduleRoutes = [
	{
		path: "/auth",
		route: AuthRoutes,
	},
	{
		path: "/users",
		route: UserRoutes,
	},
	{
		path: "/cows",
		route: CowRoutes,
	},
	{
		path: "/orders",
		route: OrderRoutes,
	},
	{
		path: "/admins",
		route: AdminRoutes,
	},
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
