"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const app = (0, express_1.default)();
// Enable all CORS requests (open access)
app.use((0, cors_1.default)());
// For JSON body parsing
app.use(express_1.default.json());
// Routes
app.use("/posts", postRoutes_1.default);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
