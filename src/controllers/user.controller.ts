// This file is a controller that runs some code when a route is hit
// This file is referenced by the user.route.ts ROUTE which uses UserController (this) as its CONTROLLER

import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import User from "../models/responses/user";

class UserController {
	public user = (req: Request, res: Response, next: NextFunction): void => {
		// Define status for the HTTP request to be sent later
		// our user database
		const users: Array<User> = [
			{
				id: "1",
				name: "roland",
				likes: "chocolate",
			},
		];

		// by the time this controller is called we expect that the values passed in have been validated
		// 		so we can put some very simple logic in here to just find the user and return them
		// if the user is 404 then we send next() a HttpException and Express will pass that to the error middleware
		// 		because HttpException is an Error (extends the error class)
		try {
			const user = users.find((user) => user.id == req.params["id"]);
			if (!user) {
				res.status(404);
				next(new HttpException(404, "user not found"));
			} else {
				res.status(200);
				res.json(user);
			}

			// set the status
		} catch (error) {
			// the HTTP exception middleware will read this even if its a standard Error and not a HttpException
			// then if its NOT a HTTP exception it just gets passed along the chain, to either express to handle the error,
			// 		or if you enable the general Error (Error class) middleware, then this will handle it instead.
			next(error);
		}
	};
}

export default UserController;
