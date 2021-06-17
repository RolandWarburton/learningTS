import request from "supertest";
import App from "../app";
import IndexRoute from "../routes/index.route";
import PageNotFound from "../routes/pageNotFound.route";
import IndexController from "../controllers/index.controller";

afterAll(async () => {
	await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
});

// https://jestjs.io/docs/expect

// Tests for the root path
describe("Testing Index", () => {
	describe("route has a controller", () => {
		test("the index route has a controller that is an indexController", () => {
			const indexRoute = new IndexRoute();
			expect(indexRoute.indexController).toBeInstanceOf(IndexController);
		});
	});

	describe("[GET] /", () => {
		test("response statusCode 200", () => {
			const indexRoute = new IndexRoute();
			const app = new App([indexRoute]);

			return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
		});
	});

	describe("[POST] /", () => {
		test("response statusCode 404", () => {
			const indexRoute = new IndexRoute();
			const pageNotFoundRoute = new PageNotFound();
			const app = new App([indexRoute, pageNotFoundRoute]);

			return request(app.getServer()).get(`/does/not/exist`).expect(404);
		});
	});
});
