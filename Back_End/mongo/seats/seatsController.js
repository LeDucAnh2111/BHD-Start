const seatsModel = require("./seatsModel");
const typeSeatsModel = require("./../typeSeats/typeSeatsModel");
async function addSeats(seats) {
  try {
    // const getTypeSeats = await typeSeatsModel.findOne({
    //   _id: seats.typeSeat,
    // });
    // if (!getTypeSeats.typeSeats) {
    //   throw new Error("Không thấy kiểu ghế phù hợp");
    // }
    // seats.typeSeats = getTypeSeats.typeSeats;
    // console.log(seats);
    const newseats = new seatsModel(seats);
    const resultSeats = await newseats.save();
    return resultSeats;
  } catch (error) {
    console.log("Lỗi ở phần Controller Seats nha!!!", error);
  }
}

async function getAllSeats() {
  try {
    const result = await seatsModel.find();
    return result;
  } catch (error) {
    console.log("Lỗi ở phần Controller Seats nha!!!", error);
  }
}

async function getSeatsById(id) {
  try {
    const result = await seatsModel.findOne({ _id: id });
    return result;
  } catch (error) {
    console.log("Lỗi ở phần Controller Seats nha!!!", error);
  }
}

module.exports = {
  addSeats,
  getAllSeats,
  getSeatsById,
};
