const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = new Schema({
	travellerName: { type: String, required: true },
	seatsBooked: [String]
});

const TrainSchema = new Schema({
	name: { type: String, required: true },
	tickets: [TicketSchema]
});

const Train = mongoose.model('train', TrainSchema);

module.exports = Train;
