const userModel = require("./userModule");
const bcrypt = require("bcrypt");
const { sendLoginEmail } = require("../../service/sendMail");

async function addUser(user) {
  try {
    let { email, gennder, number, username, password } = user;
    let checkUser = await userModel.findOne({ username: username });
    if (checkUser) {
      throw new Error("Tài khoản này đã tồn tại");
    }
    console.log(email);
    await sendLoginEmail(email);
    // mã hóa password
    const saltRounds = 10;
    const newPass = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, async (error, newPass) => {
        resolve(newPass);
      });
    });
    const newUser = new userModel({
      email,
      gennder,
      number,
      username,
      password: newPass,
    });
    const finaly = await newUser.save();

    return finaly;
  } catch (error) {
    console.log("Lỗi ở Controller User nha !!!", error);
    return -1;
  }
}

async function login(user) {
  try {
    let { username, password } = user;
    console.log(password);
    const getUser = await userModel.findOne({
      username: username,
    });
    if (!getUser) {
      throw new Error("Tài khoản hoặc mật khẩu không đúng");
    }
    // mã hóa ngược password
    const hashpassword = bcrypt.compareSync(password, getUser.password);

    // console.log(checkpassword);
    if (!hashpassword) {
      throw new Error("Tài khoản hoặc mật khẩu không đúng");
    }
    return getUser;
  } catch (error) {
    console.log("Lỗi ở Controller User Login nha !!!", error);
    return -1;
  }
}

async function updateUser(valueUpdate, id) {
  try {
    // thay đổi thông tin đăng nhập
    if (valueUpdate.username) {
      const checkUser = await userModel.findOne({
        username: valueUpdate.username,
        _id: { $ne: id },
      });
      if (checkUser) {
        throw new Error("Tài khoản đã được đặt tồn tại");
      }
    }

    // thay đổi mật khẩu đăng nhập
    if (valueUpdate.password) {
      valueUpdate.password = (function () {
        var salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(valueUpdate.password, salt);
        return password;
      })();
    }

    const resultUpdate = await userModel.findOneAndUpdate(
      { _id: id },
      valueUpdate
    );

    return resultUpdate;
  } catch (error) {
    console.log("Lỗi ở Controller User Update nha!!!", error);
    return -1;
  }
}

async function updatePassword(typePassword, id) {
  try {
    const { password, newPassword } = typePassword;
    const getUser = await userModel.findOne({
      _id: "6658d22c26f97c0c711aafc7",
    });
    const passwordOld = getUser.password;
    console.log(passwordOld);
    const checkPass = bcrypt.compareSync(password, passwordOld);
    console.log(true);
    if (!checkPass) {
      throw new Error("Mật khẩu cũ không đúng");
    }
    const saltRounds = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, saltRounds);
    console.log(hash);
    const updatePassword = userModel.findOneAndUpdate(
      { _id: "6658d22c26f97c0c711aafc7" },
      { password: hash }
    );

    return updatePassword;
  } catch (error) {
    console.log("Lỗi ở phần Controller updatePassword nha!!!", error);
    return -1;
  }
}

async function getUserById(id) {
  try {
    const user = await userModel.findOne({ _id: id });
    return user;
  } catch (error) {
    console.log("Lỗi ở userController nha !!!", error);
    return -1;
  }
}

module.exports = { addUser, login, updateUser, getUserById, updatePassword };
