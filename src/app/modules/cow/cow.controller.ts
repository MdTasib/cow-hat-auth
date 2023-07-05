import { paginationFields } from "./../../../constants/pagination";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICow } from "./cow.interface";
import httpStatus from "http-status";
import { CowFilterableFields } from "./cow.constant";
import pick from "../../../shared/pick";
import { CowService } from "./cow.service";

const createCow = catchAsync(async (req: Request, res: Response) => {
	const cowData = req.body;
	const result = await CowService.createCow(cowData);

	sendResponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Cow create Successfully",
		data: result,
	});
});

const getAllCow = catchAsync(async (req: Request, res: Response) => {
	const filters = pick(req.query, CowFilterableFields);
	const paginationOptions = pick(req.query, paginationFields);
	const result = await CowService.getAllCow(filters, paginationOptions);

	sendResponse<ICow[]>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Cows retrieved Successfully",
		meta: result.meta,
		data: result.data,
	});
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await CowService.getSingleCow(id);

	sendResponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Cow retrieved Successfully",
		data: result,
	});
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const updatedData = req.body;
	const result = await CowService.updateCow(id, updatedData);

	sendResponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Cow updated Successfully",
		data: result,
	});
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await CowService.deleteCow(id);

	sendResponse<ICow>(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Cow deleted Successfully",
		data: result,
	});
});

export const CowController = {
	createCow,
	getAllCow,
	getSingleCow,
	updateCow,
	deleteCow,
};
