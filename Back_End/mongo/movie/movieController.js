// Thực hiện thao tác CRUD
const movieModel = require("./movieModel");
const productModel = require("./movieModel");

async function addMovie(body) {
  try {
    let { title, description, duration, genre, release_date, thumb } = body;
    release_date = new Date(release_date);
    const newMovie = new productModel({
      title,
      description,
      duration,
      genre,
      release_date,
      thumb,
    });
    const result = await newMovie.save();
    return result;
  } catch (error) {
    console.log("Lỗi ở phần Controller Movie nha!!!");
    console.log("Lỗi : ", error);
  }
}

async function getAllMovie() {
  try {
    const result = await productModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi ở phần Controller Movie nha!!!");
    console.log("Lỗi : ", error);
  }
}

async function getMovieByStatus(status) {
  try {
    const listMovieByStatus = await movieModel.find({ status: status });
    return listMovieByStatus;
  } catch (error) {
    console.log("Lỗi ở phần Controller Movie nha !!!", error);
  }
}

async function getMovieById(id) {
  try {
    const movie = await movieModel.findOne({ _id: id });
    return movie;
  } catch (error) {
    console.log("Lỗi ở phần Controller Movie nha!!!");
    console.log("Lỗi : ", error);
  }
}

module.exports = {
  addMovie,
  getAllMovie,
  getMovieByStatus,
  getMovieById,
};
