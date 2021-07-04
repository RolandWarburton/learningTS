const scheme = {
	openapi: "3.1.0",
	info: {
		title: "my test api",
		version: "1.0",
		summary: "this is the summary",
		description: "this is the description",
		contact: {
			name: "Roland",
			email: "warburtonroland@gmail.com",
		},
	},
	servers: [
		{
			url: "http://localhost:3000",
			description: "development",
		},
	],
	paths: {
		"/user/:id": {
			parameters: [],
			get: {
				summary: "",
				operationId: "get-user-:id",
				responses: {
					"200": {
						description: "OK",
						content: {
							"application/json": {
								schema: {
									$ref: "#/components/schemas/User",
								},
								examples: {
									"example-1": {
										value: {
											id: "142",
											name: "Roland",
											likes: "Chocolate",
										},
									},
								},
							},
						},
					},
				},
				description: "returns a user details based on their ID",
				tags: ["general"],
			},
		},
	},
	components: {
		schemas: {
			User: {
				title: "User",
				type: "object",
				description: "",
				examples: [
					{
						id: 142,
						name: "Roland",
						likes: "Chocolate",
					},
				],
				properties: {
					id: {
						type: "string",
						description: "Unique identifier for the given user.",
					},
					name: {
						type: "string",
					},
					likes: {
						type: "string",
					},
				},
				required: ["id", "name", "likes"],
			},
		},
		securitySchemes: {},
	},
	tags: [
		{
			name: "general",
		},
	],
};

export default scheme;
