const express = require("express");
const Holidays = require("../models/Holidays");
const { StatusCodes } = require("http-status-codes")

const router = express.Router();

router.get("/", async (req, res) => {
  const holidays = await Holidays.find();
  res.status(StatusCodes.OK).send({ status: "success", data: holidays})
});

router.post("/", async (req, res) => {
  if (req.body.likes < 0) {
    res.status(418).send("Likes can't be negative");
  }
  try {
    const holidays = await Holidays.create(req.body);
    res.status(StatusCodes.CREATED).send({ status: "success", data: holidays});
  } catch (error) {
    res.send(error);
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedHoliday = await Holidays.findByIdAndRemove(id);
    res.status(StatusCodes.OK).send(deletedHoliday);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
});

//? Request + Cookie -> Session -> req.session
router.get("/:id", async (req, res) => {
    if (!req.session.user) {
        res.status(StatusCodes.UNAUTHORIZED).send({ status: "fail", data: "No access"});
    } else {
      const id = req.params.id;
      try {
        const holiday = await Holidays.findById(id);
        if (holiday === null) {
          res
            .status(StatusCodes.NOT_FOUND)
            .send({ status: "fail", data: "Holiday Not Found" });
        } else {
          res.status(StatusCodes.OK).send(holiday);
        }
      } catch (error) {
        res.send(error);
      }
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const updateHoliday = await Holidays.findByIdAndUpdate(
        id,
       req.body,
        { new: true }
      );
      res
      .status(StatusCodes.OK)
      .send({ status: "success:", data: updateHoliday });
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;
