const returnResponse = (message, code, books = []) => {
  return {
    msg: message,
    status: code,
    books,
  };
};

module.exports = returnResponse;
