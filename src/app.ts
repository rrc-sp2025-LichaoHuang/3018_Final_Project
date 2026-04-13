import express, { Express } from "express";
import fileRoutes from "./api/v1/routes/fileRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

// Initialize Express application
const app: Express = express();

app.use(express.json());

/**
 * Health endpoint
 * GET /api/v1/health
 */
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/files", fileRoutes);

app.use("/api/v1/admin", adminRoutes);

export default app;