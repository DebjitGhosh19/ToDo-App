import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todoController.js";
import authMiddle from "../middlewire/authMiddlewire.js";

const Todorouter = express.Router();

Todorouter.post("/create",authMiddle,createTodo );
//get all todos
Todorouter.post("/getall/:userId", authMiddle, getAllTodos);
//delete todo
Todorouter.post("/delete/:todoId", authMiddle, deleteTodo);
//update todo
Todorouter.patch("/update/:todoId", authMiddle, updateTodo);
export default Todorouter;