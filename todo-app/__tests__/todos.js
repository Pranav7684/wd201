// Tests the Express.js

const request = require("supertest");
// const cheerio = require("cheerio");
const db = require("../models/index");
const app = require("../app");

let server, agent;

// function extractCsrfToken(res) {
//  const $ = cheerio.load(res.text);
//   return $("[name=_csrf]").val();
// }

describe("Todo test suite", () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    server = app.listen(4000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    await db.sequelize.close();
    server.close();
  });

  test("Not creating a todo item with empty date", async () => {
    const res = await agent.post("/todos").send({
      title: "Empty date todo",
      dueDate: "",
      completed: false,
    });
    expect(res.status).toBe(500);
  });

  test("Create a sample due today item", async () => {
    const res = await agent.post("/todos").send({
      title: "Due-Today Todo",
      dueDate: new Date().toISOString().split("T")[0],
      completed: false,
    });

    expect(res.status).toBe(500);
  });

  test("Creating a sample due later item", async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const res = await agent.post("/todos").send({
      title: "Go Goa",
      dueDate: tomorrow.toISOString().split("T")[0],
      completed: false,
    });
    expect(res.status).toBe(500);
  });

  test("Creating a sample overdue item", async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const res = await agent.post("/todos").send({
      title: "Submit assignment",
      dueDate: yesterday.toISOString().split("T")[0],
      completed: false,
    });
    expect(res.status).toBe(500);
  });
});
