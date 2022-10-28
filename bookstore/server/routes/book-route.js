const express = require("express");
const router = express.Router();
const booksController = require("../controller/book-controller");

router.get("/", booksController.getAllBooks);
router.post("/", booksController.addBook);
router.get("/:id", booksController.getBookById);
router.put("/:id", booksController.updateBookById);
router.delete("/:id", booksController.deleteBookById);

module.exports = router;
