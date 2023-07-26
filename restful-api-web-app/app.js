const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const methodOverride = require("method-override");
const db = require("./routes/db"); // Data Access Layer

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// API Routes
const apiRoutes = require("./routes/api");
app.use("/api", apiRoutes);

// Web Application Routes
const webRoutes = require("./routes/web");
app.use("/", webRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
