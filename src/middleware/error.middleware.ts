// This file is called by an MVC controller when it fails to run
// It uses the custom HttpException which extends the Error class with a HTTP "status" field

import { Request, Response } from "express";
import HttpException from "../exceptions/HttpException";

function errorMiddleware(error: HttpException, req: Request, res: Response): void {
	const status: number = error.status || 500;
	const message: string = error.message || "Something went wrong";

	console.log("[ERROR] ", status, message);

	res.status(status).json({ message });
}

export default errorMiddleware;
