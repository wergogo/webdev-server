import mongoose from "mongoose";
import TodosDao from "./dao";
const STATES = ["disconnected", "connected", "connecting", "disconnecting"];
export default function Lab6(app) {
  const dao = TodosDao();
  app.get("/lab6/connection", (req, res) => {
    const { readyState, name, host } = mongoose.connection;
    res.json({
      status: STATES[readyState] ?? "unknown",
      database: name,
      host,
    });
  });
  app.get("/lab6/todos", async (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const todos = await dao.findTodosByCompleted(completed === "true");
      res.json(todos);
      return;
    }
    const todos = await dao.findAllTodos();
    res.json(todos);
  });
  app.get("/lab6/todos/:todoId", async (req, res) => {
    const todo = await dao.findTodoById(req.params.todoId);
    if (!todo) {
      res.status(404).json({ message: `Unable to find todo ${req.params.todoId}` });
      return;
    }
    res.json(todo);
  });
  app.post("/lab6/todos", async (req, res) => {
    const todo = await dao.createTodo(req.body);
    res.json(todo);
  });
  app.put("/lab6/todos/:todoId", async (req, res) => {
    const { todoId } = req.params;
    await dao.updateTodo(todoId, req.body);
    const todo = await dao.findTodoById(todoId);
    if (!todo) {
      res.status(404).json({ message: `Unable to update todo ${todoId}` });
      return;
    }
    res.json(todo);
  });
  app.delete("/lab6/todos/:todoId", async (req, res) => {
    const status = await dao.deleteTodo(req.params.todoId);
    res.json(status);
  });
}
