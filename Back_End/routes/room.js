var express = require("express");
var router = express.Router();
var roomController = require("./../mongo/room/roomController");

router.post("/", async (req, res) => {
  try {
    const room = req.body;
    const result = await roomController.addRoom(room);
    res.status(200).json(result);
  } catch (error) {
    console.log("Lỗi ở trang router Room nha !!!", error);
  }
});

// router.get("/", (req, res) => {
//   try {
//     const r
//   } catch (error) {

//   }
// })

module.exports = router;
