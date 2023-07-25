const express = require("express");
const router = express.Router();
const methodOverride = require("method-override");
const { Pool } = require("pg");

const connectionString =
  "postgres://your_postgres_user:your_postgres_password@your_postgres_host:5432/your_database_name";
const pool = new Pool({ connectionString });

// GET all authors
router.get("/authors", async (req, res) => {
  try {
    const query = "SELECT * FROM authors";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all books
router.get("/books", async (req, res) => {
  try {
    const query = "SELECT * FROM books";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all genres
router.get("/genres", async (req, res) => {
  try {
    const query = "SELECT * FROM genres";
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET a specific book by ID
router.get("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const query = "SELECT * FROM books WHERE book_id = $1";
    const { rows } = await pool.query(query, [bookId]);

    if (rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST a new book
router.post("/books", async (req, res) => {
  try {
    const { book_title, author_id, genre_id, published_year } = req.body;
    const query =
      "INSERT INTO books (book_title, author_id, genre_id, published_year) VALUES ($1, $2, $3, $4) RETURNING *";
    const { rows } = await pool.query(query, [
      book_title,
      author_id,
      genre_id,
      published_year,
    ]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT (Update) a book by ID
router.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const { book_title, author_id, genre_id, published_year } = req.body;
    const query =
      "UPDATE books SET book_title = $1, author_id = $2, genre_id = $3, published_year = $4 WHERE book_id = $5 RETURNING *";
    const { rows } = await pool.query(query, [
      book_title,
      author_id,
      genre_id,
      published_year,
      bookId,
    ]);

    if (rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE a book by ID
router.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const query = "DELETE FROM books WHERE book_id = $1 RETURNING *";
    const { rows } = await pool.query(query, [bookId]);

    if (rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
