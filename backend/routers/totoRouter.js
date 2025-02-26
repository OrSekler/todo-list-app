import express from "express";
import { createTask, deleteTask, getAllTasks, getTask, updateTask } from "../controllers/todoController.js";

const todoRouter = express.Router();

todoRouter.get("/", getAllTasks);
todoRouter.get("/:id", getTask);
todoRouter.post("/", createTask);
todoRouter.put("/:id", updateTask);
todoRouter.delete("/:id", deleteTask);

export default todoRouter;