// This is just ONE route. A new file is created for every route
// The Route contains an userController which is a standard-ish MVC controller
// 		The job for userController is to actually run some code for the request

import { Router } from "express";
import UserController from "../controllers/user.controller";
import Route from "../interfaces/routes.interface";
import userRequestSchema, { UserRequest } from "../models/requests/user_id";
import validateRequest from "../middleware/validateReq.middleware";
import Ajv from "ajv";

// The "userRequestSchema" is a JSONSchemaType for AJV to consume
// The UserRequest is a typescript <Type> for JSONSchemaType

// We need "userRequestSchema" object to compile the AJV validator function
// We need "UserRequest" type to tell the validateRequest middleware
//    what type the validate function should use

class UserRoute implements Route {
	public path = "/user/:id";
	public router = Router();
	public controller = new UserController();
	private validator = new Ajv().compile(userRequestSchema);

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			`${this.path}`,
			validateRequest<UserRequest>("params", this.validator),
			this.controller.user
		);
	}
}

export default UserRoute;
