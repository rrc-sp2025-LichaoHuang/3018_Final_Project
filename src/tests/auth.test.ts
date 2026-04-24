import dotenv from "dotenv";
dotenv.config();

import request from "supertest";

// 控制角色
let mockRole: string | null = "Primarch";

jest.mock("../api/v1/middleware/authenticate", () => ({
  authenticate: (req: any, res: any, next: any) => {
    if (!mockRole) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.locals.role = mockRole;
    next();
  },
}));

import app from "../app";

describe("Authentication Tests", () => {
  // ❌ 未认证
  it("should return 401 if not authenticated", async () => {
    mockRole = null;

    const res = await request(app).get("/api/v1/files");

    expect(res.statusCode).toBe(401);
  });

  // ✅ 有权限访问
  it("should allow access for authenticated user", async () => {
    mockRole = "Primarch";

    const res = await request(app).get("/api/v1/files");

    expect(res.statusCode).toBe(200);
  });
});