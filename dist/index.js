"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server"));
console.log(server_1.default);
const app = express_1.default();
app.get("/", (req, res) => {
    res.status(200).json({ message: "hello world" });
});
app.listen(3000, () => {
    console.log("server running");
});
//# sourceMappingURL=index.js.map