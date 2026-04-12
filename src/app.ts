import express, { Express } from "express";

// Initialize Express application
const app: Express = express();

app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default app;
