var express = require("express");
var router = express.Router();
var ticketController = require("../mongo/tickets/ticketsController");

// [POST] /ticket/
router.post("/", async (req, res) => {
  try {
    let ticket = req.body;
    let resultTicket = await ticketController.addTicket(ticket);
    res.status(200).json(true);
  } catch (error) {
    console.log("Lỗi ở Router Ticket", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log(id);
    let resultTicket = await ticketController.getTicket_By_Iduser(id);

    res.status(200).json(resultTicket);
  } catch (error) {
    console.log("Lỗi ở Router Ticket", error);
  }
});

module.exports = router;
