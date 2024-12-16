const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const { booksTable, genresTable, authorsTable } = require("./tableCreation.js");

const PORT = process.env.PORT || "https://book-management-app-frontend.onrender.com";
const app = express();

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "bookStore.db");

let database = null;

//Initializing DB And Server and Creating Tables
const initialzeDBAndServer = async () => {
  try {
    database = new sqlite3.Database(dbPath, (error) => {
      if (error) {
        console.error("Error creating table:", error.message);
      }
      console.log("Connected to the SQLite Database.");
    });

    await database.run(booksTable, (error) => {
      if (error) {
        console.log("Error creating table:", error.message);
      } else {
        console.log("Books Table is Created Successfully!");
      }
    });

    await database.run(genresTable, (error) => {
      if (error) {
        console.log("Error creating table:", error.message);
      } else {
        console.log("Genres Table is Created Successfully!");
      }
    });

    await database.run(authorsTable, (error) => {
      if (error) {
        console.log("Error creating table:", error.message);
      } else {
        console.log("Authors Table is Created Successfully!");
      }
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(`DB Error: ${error}`);
    process.exit(1);
  }
};

initialzeDBAndServer();

const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    const getAllBooksQuery = `SELECT Books.BookID, Books.Title, Authors.Name AS AuthorName, Authors.AuthorID, Genres.GenreID, Genres.Name AS GenreType, Genres.Description AS description, Books.pages, Books.publishedDate FROM 
    Books INNER JOIN Authors ON Books.AuthorID = Authors.AuthorID 
     INNER JOIN Genres ON Books.GenreID = Genres.GenreID ;`;
    database.all(getAllBooksQuery, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

const runQuery = (query, params) => {
  return new Promise((resolve, reject) => {
    database.run(query, params, function (err) {
      if (err) {
        return reject(err); // Reject if there's an error
      }
      resolve(this); // Resolve with context of the query (e.g., changes made)
    });
  });
};

//Get All Books API
app.get("/books/", async (req, res) => {
  try {
    const booksList = await getAllBooks();
    res.send(booksList);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Error retrieving books");
  }
});

//Add a new book API
app.post("/books/", async (req, res) => {
  const {
    title,
    authorID,
    genreID,
    pages,
    date,
  } = req.body;

  const createBookQuery = `
      INSERT INTO Books(Title, AuthorID, GenreID, Pages, PublishedDate)
      VALUES(?, ?, ?, ?, ?)`;

  try {
    await runQuery(createBookQuery, [
      title,
      authorID,
      genreID,
      pages,
      date,
    ]);


    res.send({ message: "New book is added successfully" });
  } catch (err) {
    console.error("Error adding book:", err.message);
    res.status(500).send({ message: "Error adding new book" });
  }
});

// Update book API
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const updateBookQuery = `
      UPDATE Books 
      SET Title = ? 
      WHERE BookID = ?`;

  try {
    await runQuery(updateBookQuery, [title, id]);

    res.send({ message: "Book is updated successfully" });
  } catch (err) {
    console.error("Error updating book:", err.message);
    res.status(500).send({ message: "Error updating book" });
  }
});

//Delete book API
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  const deleteBookQuery = `
      DELETE FROM Books 
      WHERE BookID = ?`;

  try {
    await runQuery(deleteBookQuery, [id]);

    res.send({ message: "Book is deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    res.status(500).send({ message: "Error deleting book" });
  }
});
