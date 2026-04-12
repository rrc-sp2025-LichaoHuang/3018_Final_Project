import express, { Express } from "express";
import fileRoutes from "./api/v1/routes/fileRoutes";

// Initialize Express application
const app: Express = express();

app.use(express.json());

// Health endpoint
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/v1/files", fileRoutes);

export default app;
