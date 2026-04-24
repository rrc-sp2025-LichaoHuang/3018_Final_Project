import express, { Express } from "express";
import fileRoutes from "./api/v1/routes/fileRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import setupSwagger from "./api/v1/configs/swagger";
import uploadRoutes from "./api/v1/routes/uploadRoutes";
import { getHelmetConfig } from "./api/v1/configs/helmetConfig";

// Initialize Express application
const app: Express = express();

app.use(getHelmetConfig());

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

app.use("/api/v1/upload", uploadRoutes);


setupSwagger(app);

export default app;