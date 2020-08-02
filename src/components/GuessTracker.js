import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const GuessTracker = props => {
	const [players, setPlayers] = useState(props.players.slice());
	const [round, setRound] = useState(props.round);

	function createOnChangeHandler(index) {
		return e => {
			const value = e.target.value;
			const updatedPlayers = [...players];
			updatedPlayers[index].currentGuess = value;
			setPlayers(updatedPlayers);
		};
	}

	return (
		<div className="container">
			<div className="input-message">
				It is round {round}! Record your guesses below.
			</div>
			<div className="player-guesses">
				{players.map((player, i) => (
					<div key={i} className="guess-field">
						<TextField
							value={player.currentGuess}
							label={player.isTurn ? player.name + " (D)" : player.name}
							variant="outlined"
							onChange={createOnChangeHandler(i)}
						/>
					</div>
				))}
			</div>
			<div className="start-button">
				<Button variant="contained" color="primary">
					Done Guessing
				</Button>
			</div>
			<div className="player-guesses">
				{players.map((player, i) => (
					<div key={i} className="guess-field">
						<TextField
							value={player.currentGuess}
							label={player.isTurn ? player.name + " (D)" : player.name}
							variant="outlined"
							onChange={createOnChangeHandler(i)}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default GuessTracker;
