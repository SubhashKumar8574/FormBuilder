import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import formsRoutes from "./routes/forms.js";
import submissionsRoutes from "./routes/submissions.js";
import uploadRoutes from "./routes/upload.js";
import analyticsRoutes from "./routes/analytics.js";

import errorHandler from "./middleware/errorHandler.js";
import rateLimit from "./middleware/rateLimit.js";
import corsMiddleware from "./middleware/cors.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(rateLimit);

// Routes
app.use("/api/forms", formsRoutes);
app.use("/api/forms/:id/submissions", submissionsRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/forms/:id/analytics", analyticsRoutes);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
