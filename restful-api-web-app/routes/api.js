const express = require("express");
const router = express.Router();
const db = require("./db");

// GET all books
router.get("/books", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM books ORDER BY id");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching books from the database." });
  }
});

// POST a new book
router.post("/books", async (req, res) => {
  const { title, author, published_year } = req.body;
  try {
    const { rows } = await db.query(
      "INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3) RETURNING *",
      [title, author, published_year]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error inserting the book into the database." });
  }
});

// PUT (Update) a book
router.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, published_year } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE books SET title = $1, author = $2, published_year = $3 WHERE id = $4 RETURNING *",
      [title, author, published_year, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating the book in the database." });
  }
});

// PATCH (Partial Update) a book
router.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, published_year } = req.body;
  try {
    const { rows } = await db.query(
      "UPDATE books SET title = COALESCE($1, title), author = COALESCE($2, author), published_year = COALESCE($3, published_year) WHERE id = $4 RETURNING *",
      [title, author, published_year, id]
    );
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error updating the book in the database." });
  }
});

// DELETE a book
router.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.json({ message: "Book deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting the book from the database." });
  }
});

module.exports = router;
