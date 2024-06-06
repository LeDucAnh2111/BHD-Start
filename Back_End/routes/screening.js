const express = require("express");
const router = express.Router();
const screeningController = require("./../mongo/screening/screeningController");

// [POST] /screening/
router.post("/", async (req, res) => {
  try {
    const screening = req.body;
    const resultScreening = await screeningController.addScreening(screening);
    res.status(200).json(resultScreening);
  } catch (error) {
    console.log("Lỗi ở phần router Screening", error);
  }
});

// [POST] /screening

router.get("/", async (req, res) => {
  try {
    const id_movie = req.query.movie;
    const resultScreeningMovie = await screeningController.getScreeningByMovie(
      id_movie
    );
    res.status(200).json(resultScreeningMovie);
  } catch (error) {
    console.log("lỗi ở phần Router Screening nha!", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resultScreeningMovie = await screeningController.getScreeningById(id);
    console.log("aa");
    res.status(200).json(resultScreeningMovie);
  } catch (error) {
    console.log("lỗi ở phần Router Screening nha!", error);
  }
});

router.post("/date", async (req, res) => {
  try {
    const id_movie = req.query.movie;
    const { date } = req.body;
    const resultScreeningMovie =
      await screeningController.getScreeningByMovieAnDate(id_movie, date);
    res.status(200).json(resultScreeningMovie);
  } catch (error) {
    console.log("lỗi ở phần Router Screening nha!", error);
  }
});

module.exports = router;
