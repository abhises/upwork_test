import express from "express";
import cors from "cors";
import postRoutes from "./routes/postRoutes";

const app = express();

// Enable all CORS requests (open access)
app.use(cors());

// For JSON body parsing
app.use(express.json());

// Routes
app.use("/posts", postRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
