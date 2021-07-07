import UserController from "../controllers/user.controller";
import User from "../models/responses/user";
import HttpException from "../exceptions/HttpException";
import { Request, Response, NextFunction } from "express";

describe("test", () => {
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	let nextFunction: Partial<NextFunction>;

	let resultJson = {};
	let resultStatus = {};

	beforeEach(() => {
		// reset the request and response objects before each test
		mockRequest = {};
		mockResponse = {};

		// reset the objects that store results in them
		resultJson = {};
		resultStatus = {};

		// mock the response status
		mockResponse.status = jest.fn().mockImplementation((result) => {
			resultStatus = result;
			return mockResponse;
		});

		// mock the response response
		mockResponse.json = jest.fn().mockImplementation((result) => {
			resultJson = result;
			return mockResponse;
		});

		nextFunction = jest.fn();
	});

	it("returns returns user object", () => {
		const controller = new UserController().user;

		// input to the controller
		mockRequest.params = { id: "1" };

		// expected response
		const expected: User = { id: "1", name: "roland", likes: "chocolate" };

		// run the controller method
		controller(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

		// when the res.status is called we expect it to be passed 200
		expect(resultStatus).toBe(200);

		// expect the response to be this user
		expect(resultJson).toEqual(expected);
	});

	it("returns user not found error", () => {
		const controller = new UserController().user;

		// input to the controller
		mockRequest.params = { id: "not a user" };

		// run the controller method
		controller(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

		// when the res.status is called we expect it to be passed 200
		expect(resultStatus).toBe(404);

		// expect the response to be empty (IE not modified by the mock)
		expect(Object.entries(resultJson).length).toBe(0);

		// expect the response.json to NOT have been called (by checking is mock properties)
		expect(mockResponse.json).toHaveBeenCalledTimes(0);

		// expect the next middleware to have been called due to the user not being found
		expect(nextFunction).toHaveBeenCalledTimes(1);

		// expect that the next middleware was called with this error
		expect(nextFunction).toHaveBeenCalledWith(new HttpException(404, "user not found"));
	});

	// Note that this logically should not happen because there is no route to the controller that allows no user to be passed
	//      as /user/:id requires a parameter to be set (otherwise the path is just /user)
	// Its up to you if you want to write these tests to handle future situations
	//      when you might decide to implement a route that will practically use this test
	test("nothing is passed", () => {
		const controller = new UserController().user;

		// input to the controller
		mockRequest.params = {};

		// run the controller method
		controller(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

		// when the res.status is called we expect it to be passed 200
		expect(resultStatus).toBe(404);
	});
});
