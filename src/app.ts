import cors from "cors";
import express from "express";
import helmet from "helmet";
import Route from "./interfaces/routes.interface";
import logger from "./utils/genericLogger";
import httpExceptionMiddleware from "./middleware/httpException.middleware";
// eslint-disable-next-line node/no-unpublished-import
import swaggerUi from "swagger-ui-express";
// eslint-disable-next-line node/no-unpublished-import
import { OpenAPIV3 } from "openapi-types";
import openapiSpecification from "./swagger";

// ? import swagger-jsdoc optionally for using jsdoc OpenAPI documentation
// eslint-disable-next-line node/no-unpublished-import
// import swaggerJsdoc from "swagger-jsdoc";

// ? import errorMiddleware to catch errors that are not just HttpExceptions
// import errorMiddleware from "./middleware/error.middleware";

class App {
	// List all the fields that this class will contain
	// Note that routes passed to the controller does not exist here
	// 	Thats because the routes are consumer immediately by initializeRoutes and attached to the app at runtime
	public app: express.Application;
	public port: string | number;
	public env: boolean;

	constructor(routes: Route[]) {
		this.app = express();
		this.port = process.env["PORT"] || 3000;
		this.env = process.env["NODE_ENV"] === "production" ? true : false;

		this.initializeMiddlewares();
		this.initilizeDocs();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
	}

	public listen(): void {
		/* istanbul ignore next */
		this.app.listen(this.port, () => {
			logger.info(`🚀 App listening on the port ${this.port}`);
		});
	}

	public getServer(): express.Application {
		return this.app;
	}

	private initializeMiddlewares() {
		if (this.env) {
			// running in production
			this.app.use(helmet());
			this.app.use(cors({ origin: `${process.env["DOMAIN"]}`, credentials: true }));
		} else {
			this.app.use(cors({ origin: true, credentials: true }));
		}

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	// Create the swagger UI for openapi documentation
	// This step MUST come before the initialize routes
	private initilizeDocs() {
		// use swagger-jsdoc to get openapi scheme
		// const openapiSpecification: Partial<OpenAPIV3.Document> = swaggerJsdoc(openApiSettings);

		// or import an openapi spec (my preferred method) by importing the full doc
		this.app.use(
			"/api",
			swaggerUi.serve,
			swaggerUi.setup(openapiSpecification as OpenAPIV3.Document)
		);
	}

	// consume the routes and add them to the app
	private initializeRoutes(routes: Route[]) {
		routes.forEach((route) => {
			this.app.use("/", route.router);
		});
	}

	// This should be initilized last to catch any errors
	// This will also be hit if you have not implemented a 404 page
	private initializeErrorHandling() {
		this.app.use(httpExceptionMiddleware);

		// Optionally you can enable this error middleware to catch errors of generic type Error (instead of just HTTP exceptions)
		// 		This is possible because the httpExceptionMiddleware will pass any error on if its not a httpException
		// this.app.use(errorMiddleware);
	}
}

export default App;
