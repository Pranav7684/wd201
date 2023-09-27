// index.js => app.js

const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const { response } = require("express");

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/public")));

app.get("/", async (request, res) => {
  const allTodos = await Todo.getTodos();
  if (request.accepts("html")) {
    res.render("index", {
      allTodos,
    });
  } else {
    res.json(allTodos);
  }
});
app.get("/todos", async (request, res) => {
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});
app.post("/todos", async (request, res) => {
  console.log("Body : ", request.body);
  try {
    const todo = await Todo.addTodo({
      title: request.body.title,
      dueDate: request.body.dueDate,
      completed: false,
    });
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
app.put("/todos/:id/markAsCompleted", async (request, res) => {
  console.log("Todo marks completed : ", request.params.id);
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updateTodo = await todo.markAsCompleted();
    return res.json(updateTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});
app.delete("/todos/:id", async (request, res) => {
  console.log("We have to delete a Todo with ID: ", request.params.id);
  const affectedRow = await Todo.destroy({ where: { id: request.params.id } });
  res.send(affectedRow ? true : false);
});

module.exports = app;