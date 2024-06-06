const mongoose = require("mongoose");

async function connect() {
  await mongoose
    .connect("mongodb://localhost:27017/cinemar")
    .then(() => console.log("Kết nối thành công!"))
    .catch(() => console.log("Ket noi that bai"));
}

module.exports = { connect };
