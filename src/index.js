import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import createRoles from "./config/startConfig.js";
import bodyParser from "body-parser";
dotenv.config();
import usersRouter from "./routes/users.routes.js";
import clientsRouter from "./routes/clients.routes.js";
import authRouter from "./routes/auth.routes.js";

const app = express();
createRoles();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.get("/", (req, res) => {
  res.send("Fitness Center Customer Management API - All working!");
});
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/clients", clientsRouter);

// Conectar a la base de datos
mongoose
  .connect(process.env.DB_URI, {
    dbName: process.env.MONGOD_DB_NAME,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("Db is connected"))
  .catch((err) => console.log("Error connecting to the database", err));

export default app;
