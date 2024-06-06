const typeSeatsModel = require("./typeSeatsModel");

async function addTypeSeats(typeSeats) {
  try {
    const typeSeats = new typeSeatsModel({
      typeSeats,
    });
    const resultTypeSeats = await typeSeats.save();
    return resultTypeSeats;
  } catch (error) {
    console.log("Lỗi ở typeSeatsController nha!!!", error);
  }
}

module.exports = { addTypeSeats };
