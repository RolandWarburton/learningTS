import { NextFunction, Request, Response, RequestHandler } from "express";
import Ajv from "ajv";
import { JSONSchemaType } from "ajv";
import HttpException from "../exceptions/HttpException";

type Value = "body" | "query" | "params";

// when we call this we need to tell it the type we expect the schema to be
// for example in user.route.ts: `validateRequest<UserRequest>("params", userRequestSchema)`
function validationMiddleware<Type>(value: Value, schema: JSONSchemaType<Type>): RequestHandler {
	// This is sort of like a factory pattern that returns some middleware function that can validate any <Type> of schema passed to it.
	return (req: Request, res: Response, next: NextFunction) => {
		// compile the schema for use
		const validate = new Ajv().compile(schema);

		// run a validation check of the request ("body"/"query"/"params") against the schema we gave it
		if (validate(req[value])) next();
		else next(new HttpException(400, `wrong body from validate middleware`));
	};
}

export default validationMiddleware;
