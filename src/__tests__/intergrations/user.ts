// eslint-disable-next-line node/no-unpublished-import
import supertest, { SuperTest, Request } from "supertest";
import App from "../../app";
import UserRoute from "../../routes/user.route";
import PageNotFoundRoute from "../../routes/pageNotFound.route";

describe("user intergrations", () => {
	const routes = [new UserRoute(), new PageNotFoundRoute()];
	const app = new App(routes);
	const server = app.getServer();
	const request: SuperTest<Request> = supertest(server);

	test("where user exists", async () => {
		const response = await request.get("/user/1");
		expect(response.status).toBe(200);
		expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
		expect(response.body).toEqual({ id: "1", name: "roland", likes: "chocolate" });
	});

	// test("where user does not exist", async () => {
	// 	const response = await request.get("/user/-1");
	// 	expect(response.status).toBe(404);
	// 	// expect(response.header["content-type"]).toBe("application/json; charset=utf-8");
	// 	// expect(response.body).toEqual({ id: "1", name: "roland", likes: "chocolate" });
	// });

	// test("where user does not exist", async () => {
	// 	const requests = ["/user/not found", "/user/-1"];
	// 	for (const r in requests) {
	// 		const response = await request.get(r);
	// 		expect(response.status).toBe(404);
	// 	}
	// });

	test("where user does not exist", async () => {
		const requests = ["/user/not found", "/user/-1"];
		for await (const r of requests) {
			const response = await request.get(r);
			expect(response.status).toBe(404);
		}
		// for (const r in requests) {
		// 	const response = await request.get(r);
		// 	expect(response.status).toBe(404);
		// }
	});
});
