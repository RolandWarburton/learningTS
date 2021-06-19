import IndexController from "../controllers/index.controller";
import { Request, Response, NextFunction } from "express";

describe("test", () => {
	// declare these partials outside of the test scope so they are available within the closure of the test at all times.
	// A partial is a typescript feature that means the mocked object will be a subset of the object it is pretending to be
	// 		Later on when we pass the mockRequest and mockResponse to the controller we coerce them into their
	// 		type using the (mockRequest as Request), "as" keyword so the controller is happy with the types
	let mockRequest: Partial<Request>;
	let mockResponse: Partial<Response>;
	let nextFunction: Partial<NextFunction>;

	// we also create these objects to store the result of the .status and .json that express gives to us when we mock
	// 		the implementation of the .status and .json functions that exist inside the controller
	let resultJson = {};
	let resultStatus = {};

	beforeEach(() => {
		// reset the request and response objects before each test
		mockRequest = {};
		mockResponse = {};

		// reset the objects that store results in them
		resultJson = {};
		resultStatus = {};

		// The mockImplementation catches the .status function when it is called in express,
		// 	then runs the below test code to "implement" what the function will do.
		//
		// To test express there is a special requirement, that is to return the "mockResponse" object every time,
		// 		this mimics the "function chaining" behavior of express where we call .status().json({}) in the controller
		//
		// the .mockImplementation((result) => {} "result" variable is given to us by express and represents
		// 		what the controller and express passed to the .status and .json parts of the chain,
		// 		essentially we just steal that and keep it for our assertions later on in the test
		mockResponse.status = jest.fn().mockImplementation((result) => {
			resultStatus = result;
			return mockResponse;
		});

		mockResponse.json = jest.fn().mockImplementation((result) => {
			resultJson = result;
			return mockResponse;
		});

		// Create a jest function that we can pass as the nextFunction to the controller
		// 		If the controller reaches an error state, then the next() function will be called
		// 		and we will be able to assert that by calling the .toHaveBeenCalledTimes() method
		nextFunction = jest.fn();
	});

	it("returns 200 and the expected json body", () => {
		const controller = new IndexController().index;
		// run the index controller with the req of {} and wait for the response
		controller(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

		// when the res.status is called we expect it to be passed 200
		expect(resultStatus).toBe(200);

		// when the res.json is called we expect it to have the body json from the controller
		expect(resultJson).toEqual({ hello: "world" });
	});

	it("calls the next function when the json error field is passed to it", () => {
		const controller = new IndexController().index;

		mockRequest.body = { error: "please" };
		controller(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

		// check that the next function has been called
		expect(nextFunction).toHaveBeenCalledTimes(1);
	});

	it("does not throw an error when json is passed to it", () => {
		const controller = new IndexController().index;

		mockRequest.body = { noError: "please" };
		controller(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

		// check that the next function has been called
		expect(nextFunction).toHaveBeenCalledTimes(0);
	});
});
