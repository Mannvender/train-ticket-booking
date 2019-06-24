import axios from 'axios';
import React, { Component } from 'react';

// CSS
import './App.css';
import './core/css/material-kit.css';

// AntDesign Components
import {
	Button,
	InputNumber,
	Row
} from 'antd';

// Components
import SeatsAvailability from './components/SeatsAvailability';

import { host } from './config.json';

class App extends Component {
	state = {
		numTickets: null,
		seatReserved: [],
		seatBookedByUser: []
	}

	async componentDidMount() {
		try {
			const { data: train } = await axios.get(`${host}/trains/5d10f82b66bd21165dbd2d18`);
			let reservedSeats = [];
			train.tickets.forEach(ticket => reservedSeats = [...reservedSeats, ...ticket.seatsBooked]);
			this.setState({ seatReserved: reservedSeats });
		} catch (error) {
			console.error(error);
		}
	}

	handleInputChange = numTickets => this.setState({ numTickets });

	initBooking = async () => {
		const { data: allotedSeats } = await axios.get(`${host}/trains/5d10f82b66bd21165dbd2d18/available-seats`, { params: { numberOfSeats: this.state.numTickets } });
		console.log(allotedSeats)
		const { data: ticket } = await axios.post(`${host}/trains/tickets/5d10f82b66bd21165dbd2d18/`, { travellerName: 'Random Dude', seatsBooked: allotedSeats });
		console.log(ticket.seatsBooked)
		this.setState({ seatBookedByUser: ticket.seatsBooked, seatReserved: [...this.state.seatReserved, ...this.state.seatBookedByUser] });
	}

	render() {
		const { seatBookedByUser, seatReserved } = this.state;
		console.log(seatBookedByUser, seatReserved)
		return (
			<div className="container">
				<Row className="mt-5 mb-2" type="flex" justify="center">
					<InputNumber className="w-100" min={0} max={7} onChange={this.handleInputChange} size="large" placeholder="Enter number of tickets" />
				</Row>
				<Row className="mb-4" type="flex" justify="center">
					<Button onClick={this.initBooking} size="large" type="primary" block>Book Tickets</Button>
				</Row>
				<SeatsAvailability seatReserved={seatReserved} seatBookedByUser={seatBookedByUser} />
			</div>
		);
	}
}

export default App;

