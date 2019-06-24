const route = require("express").Router();
const _ = require("lodash");
const { ObjectId } = require("mongoose").Types;
const Train = require("./train-model");

const prependToObjKey = (obj, prependStr) => {
  const keys = Object.keys(obj);

  keys.forEach(key => {
    obj[prependStr + key] = obj[key];
    delete obj[key];
  });
};

route.get("/:trainId/all", async (req, res) => {
  try {
    const { trainId } = req.params;
    const { tickets } = await Train.findById(trainId);
    res.send(tickets);
  } catch (error) {
    console.error(error);
    res.status(400).send("Not Found");
  }
});

route.get("/:trainId/:ticketId", async (req, res) => {
  try {
    const { trainId, ticketId } = req.params;
    const { tickets } = await Train.findById(trainId);
    res.send(_.find(tickets, { _id: ObjectId(ticketId) }));
  } catch (error) {
    console.error(error);
    res.status(400).send("Not Found");
  }
});

route.post("/:trainId", async (req, res) => {
  try {
    const { trainId } = req.params;
    const _id = new ObjectId();
    req.body._id = _id;
    const { tickets } = await Train.findByIdAndUpdate(
      trainId,
      { $push: { tickets: req.body } },
      { new: true }
    );
    res.send(_.find(tickets, { _id }));
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid Operation");
  }
});

route.patch("/:trainId/:ticketId", async (req, res) => {
  try {
    const { trainId, ticketId } = req.params;
    prependToObjKey(req.body, "tickets.$.");
    const { tickets } = await Train.findOneAndUpdate(
      { _id: ObjectId(trainId), "tickets._id": ticketId },
      req.body,
      { new: true }
    );
    res.send(_.find(tickets, { _id: ObjectId(ticketId) }));
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid Operation");
  }
});

route.delete("/:trainId/:ticketId", async (req, res) => {
  try {
    const { trainId, ticketId } = req.params;
    const { tickets } = await Train.findByIdAndUpdate(trainId, {
      $pull: { tickets: { _id: ticketId } }
    });
    res.send(_.find(tickets, { _id: ObjectId(ticketId) }));
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid Operation");
  }
});

module.exports = route;
