// Thực hiện thao tác CRUD
const genreModel = require("./genreModel");

async function getGenres() {
  try {
    const result = await genreModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi ở phần Controller Genre nha!!!");
    console.log("Lỗi : ", error);
  }
}

async function addGenres(body) {
  try {
    const { title, description, status } = body;
    const newGenre = new genreModel({
      title,
      description,
      status,
    });
    const result = await newGenre.save();
    return result;
  } catch (error) {
    console.log("Lỗi ở phần Controller Genre nha!!!");
    console.log("Lỗi : ", error);
  }
}

module.exports = {
  getGenres,
  addGenres,
};
