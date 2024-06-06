var express = require("express");
var router = express.Router();
const cookieParser = require("cookie-parser");
const genreController = require("../mongo/genre/genreController");

router.use(cookieParser());

/* GET users listing. */
router.get("/", async function (req, res, next) {
  const id = req.cookies.sessionId;
  console.log(id);
  const result = await genreController.getGenres();
  res.status(200).json(result);
});

router.post("/", async function (req, res, next) {
  const data = req.body;
  const result = await genreController.addGenres(data);
  res.status(200).json(result);
});

module.exports = router;
