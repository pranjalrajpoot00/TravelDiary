import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { dbConnection } from "./dbConnect.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/users", userRoutes);

dbConnection();
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is Running for Admin " + PORT);
});
