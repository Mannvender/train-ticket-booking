import React, { Component } from 'react';

class DrawGrid extends Component {
	render() {
		const { seat, seatReserved, seatBookedByUser } = this.props;
		return (
			<div className="container1">
				<table className="grid">
					<tbody>
						<tr>
							{seat.map(seat =>
								<td
									className={seatReserved.indexOf(seat + '') > -1 ? 'reserved' : seatBookedByUser.indexOf(seat + '') > -1 ? 'user-reserved' : 'available'}
									key={seat}>{seat} </td>)}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default DrawGrid;