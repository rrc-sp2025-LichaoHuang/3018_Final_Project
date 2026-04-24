import dotenv from "dotenv";

dotenv.config();

import request from "supertest";
import app from "../app";


// Mock authentication middleware
jest.mock("../api/v1/middleware/authenticate", () => ({
  authenticate: (req: any, res: any, next: any) => {
    res.locals.role = "Primarch";
    next();
  },
}));

describe("File API Tests", () => {
  let createdId: string;

  // CREATE
  it("POST /api/v1/files - should create a file", async () => {
    const res = await request(app)
      .post("/api/v1/files")
      .send({
        title: "Test File",
        content: "Test content",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("title", "Test File");

    createdId = res.body.id;
  });

  // GET ALL
  it("GET /api/v1/files - should return all files", async () => {
    const res = await request(app).get("/api/v1/files");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // GET SORTED
  it("GET /api/v1/files?sort=createdAt - should return sorted files", async () => {
    const res = await request(app).get(
      "/api/v1/files?sort=createdAt"
    );

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("createdAt");
    }
  });

  // GET BY ID
  it("GET /api/v1/files/:id - should return a file", async () => {
    const res = await request(app).get(
      `/api/v1/files/${createdId}`
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id", createdId);
  });

  // UPDATE
  it("PUT /api/v1/files/:id - should update file", async () => {
    const res = await request(app)
      .put(`/api/v1/files/${createdId}`)
      .send({
        title: "Updated File",
      });

    expect(res.statusCode).toBe(200);
  });

  // DELETE
  it("DELETE /api/v1/files/:id - should delete file", async () => {
    const res = await request(app).delete(
      `/api/v1/files/${createdId}`
    );

    expect(res.statusCode).toBe(200);
  });

  // ❌ ERROR CASE
  it("GET /api/v1/files/:id - should return 404 for deleted file", async () => {
    const res = await request(app).get(
      `/api/v1/files/${createdId}`
    );

    expect(res.statusCode).toBe(404);
  });

  // ❌ INVALID ID
  it("GET /api/v1/files/:id - should return 404 for invalid id", async () => {
    const res = await request(app).get(
      "/api/v1/files/invalid-id"
    );

    expect(res.statusCode).toBe(404);
  });

  it("should return health status", async () => {
  const res = await request(app).get("/api/v1/health");

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("status", "OK");
});

});

