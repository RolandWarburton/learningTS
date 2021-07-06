/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// This is just ONE route. A new file is created for every route
// The Route contains an userController which is a standard-ish MVC controller
// 		The job for userController is to actually run some code for the request

import { Router } from "express";
import UserController from "../controllers/user.controller";
import Route from "../interfaces/routes.interface";
import userRequestSchema, { UserRequest } from "../models/requests/user_id";
import validateRequest from "../middleware/validateReq.middleware";
import Ajv from "ajv";

class UserRoute implements Route {
	public path = "/user/:id";
	public router = Router();
	public userController = new UserController();
	private validator = new Ajv().compile(userRequestSchema);

	constructor() {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			`${this.path}`,
			validateRequest<UserRequest>("params", this.validator),
			this.userController.user
		);
	}
}

export default UserRoute;
