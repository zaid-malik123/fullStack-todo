import request from "supertest";
import app from "../app.js";
import { connect, closeDatabase, clearDatabase } from "../src/db/test.db.js";

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("TODO API TEST", () => {
  const todoPaload = {
    title: "test_title",
    description: "test_description",
    isCompleted: false,
  };
  it("GET / should work", async () => {
    const res = await request(app).get("/");

    expect(res.statusCode).toBe(200);
  });

  it("POST CREATE TODO TEST API ", async () => {
    const res = await request(app).post("/api/todo/create").send(todoPaload);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("GET ALL TODO LIST API TEST ", async () => {
    const res = await request(app).get("/api/todo/");

    expect(res.statusCode).toBe(200);
  });

  it("should update todo successfully", async () => {
    const createdTodo = await request(app)
      .post("/api/todo/create")
      .send(todoPaload);

    const todoId = createdTodo.body._id;

    const res = await request(app).put(`/api/todo/update/${todoId}`).send({
      title: "updated title",
      description: "updated description",
      isCompleted: true,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("updated title");
    expect(res.body.isCompleted).toBe(true);
  });

  it("should delete todo successfully", async () => {
    const createdTodo = await request(app)
      .post("/api/todo/create")
      .send(todoPaload);

    const todoId = createdTodo.body._id;

    const res = await request(app).delete(`/api/todo/delete/${todoId}`);

   expect(res.statusCode).toBe(200)
  });
});
