export default {
	definition: {
		openapi: "3.0.1",
		info: {
			title: "Hello World",
			version: "1.0.0",
		},
	},
	tags: [
		{
			name: "users",
			description: "operations available to everyone",
		},
	],
	servers: [
		{
			url: "localhost:3000/api",
			description: "development server",
			variables: {
				port: {
					default: "3000",
				},
			},
			basePath: {
				default: "v1",
			},
		},
		{
			url: "example.rolandw.dev/api",
			description: "Production server",
			variables: {
				port: {
					enum: ["443", "80"],
					default: "443",
				},
			},
			basePath: {
				default: "v1",
			},
		},
	],
	host: "localhost:3080",
	basePath: "/api",
	parameters: [
		{
			name: "id",
			in: "path",
			description: "ID of pet to use",
			required: true,
			schema: {
				type: "array",
				items: {
					type: "string",
				},
			},
			style: "simple",
		},
	],
	apis: ["**/routes/*.ts"],
};
