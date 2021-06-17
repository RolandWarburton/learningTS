/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import request from "supertest";
// import App from "../app";
// import IndexRoute from "../routes/index.route";
// import PageNotFound from "../routes/pageNotFound.route";
import IndexController from "../controllers/index.controller";
import { Request, Response } from "express";

describe("test", () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	// const nextFunction: NextFunction = jest.fn();

	beforeEach(() => {
		let responseObject = {};
		mockRequest = {};
		mockResponse = {
			json: jest.fn().mockImplementation((result) => {
				responseObject = result;
			}),
		};
	});

	test("test", () => {
		let responseObject = {};
		mockRequest = {};
		mockResponse = {
			json: jest.fn().mockImplementation((result) => {
				responseObject = result;
			}),
		};

		const controller = new IndexController().index;
		controller(mockRequest as Request, mockResponse as Response);
		expect(responseObject).toEqual({ hello: "world" });
	});
});

// // const mockRequest = {
// // 	body: {
// // 		firstName: "J",
// // 		lastName: "Doe",
// // 		email: "jdoe@abc123.com",
// // 		password: "Abcd1234",
// // 		passwordConfirm: "Abcd1234",
// // 		company: "ABC Inc.",
// // 	},
// // } as Request;

// const req = {
// 	query: {
// 		limit: "AA",
// 		skip: "AA",
// 	},
// } as unknown as Request;

// const res = {
// 	status: jest.fn(),
// 	json: () => {},
// } as unknown as Response;

// const next = jest.fn();

// // const mockResponse = () => {
// // 	const res = {
// // 		status: jest.fn().mockReturnValue(this),
// // 		json: jest.fn().mockReturnValue(this),
// // 	};
// // 	return res;
// // };

// // Tests for the root path
// describe("Testing error middleware", () => {
// 	test("returns 500", async () => {
// 		// const req = mockResponse;
// 		const controller = new IndexController();
// 		// controller.index(req);
// 		const result = controller.index(req, res, next);
// 		expect(result).toBe(1);
// 	});
// });
