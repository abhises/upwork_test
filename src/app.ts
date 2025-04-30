import express from "express";
import postRoutes from "./routes/postRoutes";

const app = express();
app.use(express.json());

app.use("/posts", postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
