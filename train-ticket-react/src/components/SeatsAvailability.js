import React, { Component } from 'react';
import DrawGrid from './DrawGrid';

const seats = [];
for (let i = 0; i < 80; i++) {
	seats.push(i);
}

class SeatsAvailability extends Component {
	state = {
		seatAvailable: [
			1, 79
		]
	}
	render() {
		const { seatBookedByUser, seatReserved } = this.props;
		return (
			<div>
				<DrawGrid
					seat={seats}
					available={this.state.seatAvailable}
					seatReserved={seatReserved}
					seatBookedByUser={seatBookedByUser}
				/>
			</div>
		);
	}
}

export default SeatsAvailability;
