var express = require("express");
var router = express.Router();
const seatController = require("../mongo/seats/seatsController");
// [POST] /seats/
router.post("/", async (req, res) => {
  try {
    const seats = req.body;
    const resultSeats = await seatController.addSeats(seats);
    res.status(200).json(resultSeats);
  } catch (error) {
    console.log("Lỗi ở Router Seats", error);
  }
});

// [GET] /seats/
router.get("/", async (req, res) => {
  try {
    const resultListSeats = await seatController.getAllSeats();
    res.status(200).json(resultListSeats);
  } catch (error) {
    console.log("Lỗi ở router Seates nha!!!", error);
  }
});

// [GET] /seats/:id

router.get("/seats-by-id", async (req, res) => {
  try {
    const id = req.query.id;
    const resultSeats = await seatController.getSeatsById(id);
    res.status(200).json(resultSeats);
  } catch (error) {
    console.log("Lỗi ở router Seats nha!!!", error);
  }
});

module.exports = router;
