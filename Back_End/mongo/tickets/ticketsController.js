const ticketsModel = require("./ticketsModel");
const screeninngModel = require("./../screening/screeningModel");
const seatsModel = require("./../seats/seatsModel");
const moviesModel = require("./../movie/movieModel");

//
async function addTicket(ticket) {
  try {
    console.log(ticket.screening_id);
    // console.log(ticket.seats_number);
    const screening = await screeninngModel.findOne({
      _id: ticket.screening_id,
    });
    if (!screening) {
      throw new Error("Không thấy xuất chiếu");
    }

    const movie = await moviesModel.findOne(
      { _id: screening.movie_id },
      "title thumb"
    );

    if (!movie) {
      throw new Error("Không thấy xuất chiếu");
    }
    ticket.movie = movie;
    console.log(movie);
    let listSeats = [];
    const fakelistSeats = await Promise.all(
      ticket.seats_number.map(async (element) => {
        const seats = await seatsModel.findOne({ _id: element.idChair });
        if (!seats) {
          throw new Error("Không thấy ghế");
        }
        listSeats.push(seats);
        return seats;
      })
    );
    console.log(fakelistSeats);
    ticket.screening_id = screening;
    ticket.seats_number = listSeats;
    const newTicket = new ticketsModel(ticket);
    const resultTicket = await newTicket.save();
    return resultTicket;
  } catch (error) {
    console.log("Lỗi ở phần Controller Tickets nha!!!");
    console.log("Lỗi : ", error);
  }
}

async function getTicket_By_Iduser(iduser) {
  try {
    const resultTicketByUser = await ticketsModel.find({ user_id: iduser });
    return resultTicketByUser;
  } catch (error) {
    console.log("Lỗi ở phần Controller Tickets nha!!!");
    console.log("Lỗi : ", error);
  }
}

module.exports = { addTicket, getTicket_By_Iduser };
