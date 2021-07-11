// eslint-disable-next-line node/no-unpublished-import
import supertest, { SuperTest, Request } from "supertest";
import App from "../../app";
import UserRoute from "../../routes/user.route";
import PageNotFoundRoute from "../../routes/pageNotFound.route";
import { validateSchema as validateUser } from "../../models/responses/user";

describe("user integrations", () => {
	const routes = [new UserRoute(), new PageNotFoundRoute()];
	const app = new App(routes);
	const server = app.getServer();
	const request: SuperTest<Request> = supertest(server);

	test("The user is returned when requested", async () => {
		const response = await request.get("/user/1");
		expect(response.status).toBe(200);
		expect(response.header["content-type"]).toBe("application/json; charset=utf-8");

		// validate the response equals what we expected
		expect(response.body).toEqual({ id: "1", name: "roland", likes: "chocolate" });

		// validate the response against the model to ensure the model is correct
		expect(validateUser(response.body)).toBeTruthy();
	});

	test("Where user does not exist return 404 user not found", async () => {
		const requests = ["/user/not found", "/user/-1", "/user/99999"];
		for await (const r of requests) {
			const response = await request.get(r);
			expect(response.status).toBe(404);
			expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
			expect(response.body).toEqual({ message: "user not found" });
		}
	});

	test("No id param returns 404 page not found", async () => {
		const response = await request.get("/users/");
		expect(response.status).toBe(404);
		expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(response.body).toEqual({ message: "Page not found" });
	});
});
