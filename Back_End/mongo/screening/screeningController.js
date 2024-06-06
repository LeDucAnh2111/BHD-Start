const screeninngModel = require("./screeningModel");
const movieModel = require("./../movie/movieModel");

function handleTime_decimal(listTime) {
  if (typeof listTime === "object") {
    return listTime.map((time) => {
      let [hours, minutes] = time.split(":").map(Number);
      // Chuyển số phút về số thực vd (30/60 =0,5) + với số giờ
      minutes = minutes ? minutes : 0;
      minutes = minutes / 60;
      hours = hours + minutes;
      return hours;
    });
  } else {
    let [hours, minutes] = listTime.split(":").map(Number);
    // Chuyển số phút về số thực vd (30/60 =0,5) + với số giờ
    minutes = minutes ? minutes : 0;
    minutes = minutes / 60;
    hours = hours + minutes;
    return hours;
  }
}

async function addScreening(screening) {
  try {
    screening.show_date = new Date(screening.show_date);
    //  Xử lý trường expiration_time trong screening
    {
      // Lấy thời gian phiêm chiếu cộng với thời lượng phim để làm expiration_time
      let { duration } = await movieModel.findOne(
        { _id: screening.movie_id },
        "duration"
      );
      duration = Number(duration);

      let hours = handleTime_decimal(screening.start_time);
      console.log(hours);
      // chuyển số phút của duration thành giờ
      duration = duration / 60;
      // cộng duration và hours để lấy được số expiration_time dưới dạng số thực
      let expiration_time = JSON.stringify(
        parseFloat((hours + duration).toFixed(1))
      );
      let [hours_expiration_time, minutes_expiration_time] = expiration_time
        .split(".")
        .map(Number);
      minutes_expiration_time = minutes_expiration_time
        ? minutes_expiration_time
        : 0;
      expiration_time = `${hours_expiration_time}:${
        minutes_expiration_time * 60 * 0.1
      }`;

      screening["expiration_time"] = expiration_time;
    }
    //  xử lý nếu phòng đó trong khung giờ đó đã được set
    {
      let room = await screeninngModel.find(
        { room: screening.room, show_date: screening.show_date },
        "start_time expiration_time show_date"
      );
      // console.log(room[0].show_date.getTime() == screening.show_date.getTime());

      let setListTime = room.map((item) => {
        return {
          start_time: handleTime_decimal(item.start_time),
          expiration_time: handleTime_decimal(item.expiration_time),
        };
      });

      for (const time of setListTime) {
        if (
          !(time.start_time > handleTime_decimal(screening.expiration_time)) &&
          !(time.expiration_time < handleTime_decimal(screening.start_time))
        ) {
          throw new Error("Phòng này hiện giờ tại đã có xuất chiếu");
        }
      }
      // let [{ start_time, expiration_time }] = room;

      // [start_time, expiration_time] = handleTime_decimal(
      //   [start_time, expiration_time]
      // );
      console.log(setListTime);
    }

    const newScreening = new screeninngModel(screening);
    const resultScreening = await newScreening.save();
    return resultScreening;
  } catch (error) {
    console.log("Lỗi ở Contrller  Screening nha !!!", error);
  }
}

async function getScreeningByMovie(movie_id) {
  try {
    const resultScreeningByMovie = await screeninngModel.find({
      movie_id: movie_id,
    });
    return resultScreeningByMovie;
  } catch (error) {
    console.log("Lỗi ở phần Controller Screening nha!!!", error);
  }
}

async function getScreeningById(id) {
  console.log(id);
  try {
    const resultScreeningByMovie = await screeninngModel.find({
      _id: id,
    });
    return resultScreeningByMovie;
  } catch (error) {
    console.log("Lỗi ở phần Controller Screening nha!!!", error);
  }
}

async function getScreeningByMovieAnDate(novie_id, date) {
  try {
    console.log(date);
    const resultScreeningByMovie = await screeninngModel.find({
      movie_id: novie_id,
      show_date: date,
    });
    console.log(resultScreeningByMovie);
    return resultScreeningByMovie;
  } catch (error) {
    console.log("Lỗi ở phần Controller Screening nha!!!", error);
  }
}

module.exports = {
  addScreening,
  getScreeningByMovie,
  getScreeningByMovieAnDate,
  getScreeningById,
};
