const express = require("express");
const router = express.Router();
const db = require("./db");

// GET all books and render the index view
router.get("/", async (req, res) => {
  try {
    const { rows: books } = await db.query("SELECT * FROM books ORDER BY id");
    res.render("index", { books });
  } catch (error) {
    res.status(500).send("Error fetching books from the database.");
  }
});

// GET the form to add a new book
router.get("/add", (req, res) => {
  res.render("add");
});

// POST a new book and redirect to the index page
router.post("/add", async (req, res) => {
  const { title, author, published_year } = req.body;
  try {
    await db.query(
      "INSERT INTO books (title, author, published_year) VALUES ($1, $2, $3)",
      [title, author, published_year]
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error inserting the book into the database.");
  }
});

// GET the form to edit a book
router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    if (rows.length === 0) {
      return res.status(404).send("Book not found.");
    }
    res.render("edit", { book: rows[0] });
  } catch (error) {
    res.status(500).send("Error fetching the book from the database.");
  }
});

// PUT (Update) a book and redirect to the index page
router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, published_year } = req.body;
  try {
    await db.query(
      "UPDATE books SET title = $1, author = $2, published_year = $3 WHERE id = $4",
      [title, author, published_year, id]
    );
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating the book in the database.");
  }
});

// DELETE a book and redirect to the index page
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting the book from the database.");
  }
});

module.exports = router;
