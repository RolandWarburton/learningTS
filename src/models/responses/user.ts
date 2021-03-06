import Ajv, { JSONSchemaType } from "ajv";

// interface for implementation of the User object
type User = {
	id: string;
	name: string;
	likes: string;
};

// type guard checking for the user object
const ajv = new Ajv();

const schema: JSONSchemaType<User> = {
	type: "object",
	properties: {
		id: { type: "string", nullable: false },
		name: { type: "string", nullable: false },
		likes: { type: "string", nullable: false },
	},
	required: ["id", "name", "likes"],
	additionalProperties: false,
};

const validateSchema = ajv.compile(schema);

export default User;
export { validateSchema };
