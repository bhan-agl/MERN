const Book = require("../model/Book");
const returnResponse = require("../model/bookResponse");

// ************************************************
//                  GET ALL BOOKS
//*************************************************

const getAllBooksViaPromise = (req, res) => {
  Book.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res
        .status(200)
        .json(returnResponse(`${books.length} Books Found`, 0, result));
    })
    .catch((err) => {
      res.status(404).json(returnResponse("No Books Found", 1));
    });
};

const getAllBooks = async (req, res) => {
  let books;
  try {
    books = await Book.find();
  } catch (error) {
    return res.status(404).json(returnResponse("No Books Found", 1));
  }

  if (!books) {
    return res.status(404).json(returnResponse("No Books Found", 1));
  }
  return res
    .status(200)
    .json(returnResponse(`${books.length} Books Found`, 0, books));
};

// ************************************************
//                  ADD A BOOK
//*************************************************

const addBook = async (req, res) => {
  const { bookName, author, description, price, status } = req.body;
  let book;
  try {
    book = new Book({ bookName, author, description, price, status });
    await book.save();
  } catch (error) {
    return res.status(400).json(returnResponse(`Unable to add ${error}`, 1));
  }

  if (!book) {
    return res.status(500).json(returnResponse(`Unable to add ${bookName}`, 1));
  } else {
    return res.status(201).json(returnResponse(`${bookName} added`, 0, book));
  }
};

// ************************************************
//                  Get BOOK BY ID
//*************************************************

const getBookById = async (req, res) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (error) {
    return res.status(404).json(returnResponse("Book Not Found", 1));
  }

  if (!book) {
    return res.status(500).json(returnResponse(`Book Not Found`, 1));
  } else {
    return res.status(200).json(returnResponse("success", 0, book));
  }
};

// ************************************************
//                  Update BOOK BY ID
//*************************************************

const updateBookById = async (req, res) => {
  const { bookName, author, description, price, status } = req.body;
  const id = req.params.id;
  let book;

  try {
    book = await Book.findByIdAndUpdate(id, {
      bookName,
      author,
      description,
      price,
      status,
    });
    book = await book.save();
    book = await Book.findById(id);
  } catch (error) {
    return res.status(404).json(returnResponse("Book does not exist", 1));
  }

  if (!book) {
    return res.status(500).json(returnResponse(`Book Not Found`, 1));
  } else {
    return res.status(200).json(returnResponse("success", 0, book));
  }
};

const deleteBookById = async (req, res) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndRemove(id);
  } catch (error) {
    return res.status(404).json(returnResponse("Book does not exist", 1));
  }

  if (!book) {
    return res.status(500).json(returnResponse(`Book Not Found`, 1));
  } else {
    return res.status(200).json(returnResponse("success", 0, book));
  }
};

// exports.getAllBooks = getAllBooks;
module.exports = {
  getAllBooks,
  addBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
