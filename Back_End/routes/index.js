var express = require("express");
var router = express.Router();

// MovieController
const MovieController = require("../mongo/movie/movieController");

// Tạo module để xử lý file ảnh

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const checkFile = (req, file, cb) => {
  if (!file.originalname.match(/\.(png|jpg|webp|gif|jpeg)$/)) {
    return cb(new Error("vui long nhap file hình ảnh"));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: checkFile });

// [GET] localhost:3000/
/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const result = await MovieController.getAllMovie();

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Lỗi ở phần router Index nhaa", error);
  }
});

// [POST] localhost:3000/
router.post("/", upload.single("thumb"), async function (req, res, next) {
  try {
    const data = req.body;
    data.thumb = req.file.originalname;
    console.log(data);
    // console.log(req.file);
    const result = await MovieController.addMovie(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Lỗi ở phần router Index nhaa", error);
  }
});

// [GET] /movies/:id
router.get("/movies/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const resulMovies = await MovieController.getMovieById(id);
    res.status(200).json(resulMovies);
  } catch (error) {
    console.log("Lỗi ở phần router Index nha !!!", error);
  }
});

// [GET] /list-movies/?status=1|2|3

router.get("/list-movies", async (req, res) => {
  try {
    const status = req.query.status;
    const resultListMovies = await MovieController.getMovieByStatus(status);
    res.status(200).json(resultListMovies);
  } catch (error) {
    console.log("Lỗi ở phần routerIndex nha !!!", error);
  }
});

module.exports = router;
