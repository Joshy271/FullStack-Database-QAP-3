const express = require("express");
const app = express();
const PORT = process.env.PORT || 5432;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

try {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error("Error starting the server:", err);
}
