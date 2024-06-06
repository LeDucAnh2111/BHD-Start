const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const userController = require("../mongo/users/userController");

router.use(cookieParser());

// [POST] /users/register
router.post("/register", async (req, res) => {
  const user = req.body;
  console.log(user);
  const resultUser = await userController.addUser(user);
  if (resultUser === -1) {
    res.status(200).json({ status: false });
  } else {
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        `sessionId=${resultUser._id}; Path=/; Max-Age=3600; SameSite=Strict`
      )
      .json({ status: true, value: resultUser });
  }
});

// [POST] /users/login
router.post("/login", async (req, res) => {
  const userLogin = req.body;
  const resultUser = await userController.login(userLogin);
  if (resultUser === -1) {
    return res.status(200).json({ status: false });
  } else {
    res
      .status(200)
      .setHeader(
        "Set-Cookie",
        `sessionId=${resultUser._id}; Path=/; Max-Age=3600; SameSite=Strict`
      )
      .json({ status: true, value: resultUser });
  }
});

// [PUT] /users/update
router.put("/update", async (req, res) => {
  const valueUpdate = req.body;
  const id = req.cookies.sessionId;
  console.log(id);
  const resultUpdate = await userController.updateUser(valueUpdate, id);
  res.status(200).json(resultUpdate);
});

// [GET] /users/
router.get("", async (req, res) => {
  const id = req.cookies.sessionId;
  console.log(id);

  const result = await userController.getUserById(id);
  if (result === -1) {
    return res.status(200).json({ status: false });
  }
  return res.status(200).json({ status: true, value: result });
});

// [POST] /user/password
router.post("/password", async (req, res) => {
  const id = req.cookies.sessionId;
  const result = await userController.updatePassword(req.body, id);
  if (result === -1) {
    return res.status(404).json({ status: false });
  }
  return res.status(200).json({ status: true, value: result });
});

module.exports = router;
