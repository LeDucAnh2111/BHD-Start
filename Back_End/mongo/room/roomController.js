const roomModel = require("./roomModel");

async function addRoom(room) {
  try {
    const newRoom = new roomModel(room);
    const resultRoom = await newRoom.save();
    return resultRoom;
  } catch (error) {
    console.log("Lỗi ở phần Controller Rôm nhaa !!", error);
  }
}

async function getAllRoom() {
  try {
    const listRoom = await roomModel.findAll();
    return listRoom;
  } catch (error) {
    console.log("Lỗi ở trang Controller Room nha !!!", error);
  }
}

module.exports = { addRoom };
