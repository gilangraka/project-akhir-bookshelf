const { nanoid } = require("nanoid");
const books = require("./books");

exports.index = (request, h) => {
  const { reading = null } = request.query;
  const { finished = null } = request.query;
  const { name = null } = request.query;

  let data = books;

  if (reading != null) {
    data = books.filter((book) => book.reading == Boolean(reading));
  }
  if (finished != null) {
    data = books.filter((book) => book.finished == Boolean(finished));
  }
  if (name != null) {
    data = data.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  return {
    status: "success",
    data,
  };
};

exports.show = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    return {
      status: "success",
      data: books[index],
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

exports.destroy = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return {
      status: "success",
      data: null,
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

exports.store = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "readPage tidak boleh lebih dari pageCount",
    });
    response.code(500);
    return response;
  }

  const finished = pageCount === readPage ? true : false;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

exports.update = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "readPage tidak boleh lebih dari pageCount",
    });
    response.code(500);
    return response;
  }
  const finished = pageCount === readPage ? true : false;

  const index = books.findIndex((book) => book.id === id);
  const updatedAt = new Date().toISOString();

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};
