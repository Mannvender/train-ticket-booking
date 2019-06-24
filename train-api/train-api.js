const route = require('express').Router();
const Train = require('./train-model');
const ticketRoute = require('./ticket-api');
const getBestPossibleSeats = require('./train-graph');

route.use('/tickets', ticketRoute);

route.get('/all', async (__, res) => {
  try {
    const trains = await Train.find({});
    res.send(trains);
  } catch (error) {
    console.error(error);
    res.status(400).send('Not Found');
  }
});

route.get('/:id/available-seats', async (req, res) => {
  try {
    const { id } = (req.params);
    const { numberOfSeats } = req.query;
    const train = await Train.findById(id);
    let reservedSeats = [];
    train.tickets.forEach(ticket => reservedSeats = [...reservedSeats, ...ticket.seatsBooked]);
    res.send(getBestPossibleSeats(numberOfSeats, reservedSeats));
  } catch (error) {
    console.error(error);
    res.status(400).send('Not Found');
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const train = await Train.findById(id);
    res.send(train);
  } catch (error) {
    console.error(error);
    res.status(400).send('Not Found');
  }
});

route.post('/', async (req, res) => {
  try {
    const newTrain = await Train.create(req.body);
    res.send(newTrain);
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid Operation');
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrain = await Train.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedTrain);
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid Operation');
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrain = await Train.findByIdAndRemove(id);
    res.send(deletedTrain);
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid Operation');
  }
});

module.exports = route;
