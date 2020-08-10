import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const GuessTracker = props => {
	const [players, setPlayers] = useState(props.players);

	function createGuessHandler(index) {
		return e => {
			const value = e.target.value;
			const updatedPlayers = [...players];
			updatedPlayers[index].currentGuess = value;
			setPlayers(updatedPlayers);
		};
	}

	function createTricksWonHandler(index) {
		return e => {
			const value = e.target.value;
			const updatedPlayers = [...players];
			updatedPlayers[index].currentTricksWon = value;
			setPlayers(updatedPlayers);
		};
	}

	function endRound() {
		return () => {
			setPlayers(updateScoresAndDealer(players));
			props.updateRound(players, props.round + 1);
		};
	}

	function updateScoresAndDealer(players) {
		let updatedPlayers = players.slice();
		const index = updatedPlayers.findIndex(item => item.isTurn === true);
		updatedPlayers[index].isTurn = false;
		updatedPlayers[(index + 1) % updatedPlayers.length].isTurn = true;
		for (let i = 0; i < updatedPlayers.length; i++) {
			let p = updatedPlayers[i];
			let ct = parseInt(p.currentTricksWon);
			let cg = parseInt(p.currentGuess);
			if (isNaN(ct) || ct === cg) {
				p.score += 2 + cg;
			} else {
				p.score -= Math.abs(ct - cg);
			}
			// Ignore history for right now.
			p.currentGuess = "";
			p.currentTricksWon = "";
		}
		return updatedPlayers;
	}

	return (
		<div className="guess-tracker">
			<div className="round-count">Round {props.round + 1}!</div>
			<div className="input-message">
				Leave the Tricks Won box blank if you guessed correctly.
			</div>
			<div className="player-guesses">
				<div id="pad-right" className="guess-field input-message">
					{" "}
					Guesses
				</div>
				{players.map((player, i) => (
					<div key={i} className="guess-field">
						<TextField
							value={player.currentGuess}
							label={player.isTurn ? player.name + " (D)" : player.name}
							variant="outlined"
							onChange={createGuessHandler(i)}
						/>
					</div>
				))}
			</div>
			<div className="player-guesses">
				<div id="pad-right" className="guess-field input-message">
					Tricks Won
				</div>
				{players.map((player, i) => (
					<div key={i} className="guess-field">
						<TextField
							value={player.currentTricksWon}
							label={player.name}
							variant="outlined"
							onChange={createTricksWonHandler(i)}
						/>
					</div>
				))}
			</div>
			<div className="start-button">
				<Button variant="contained" color="primary" onClick={endRound()}>
					End Round
				</Button>
			</div>
		</div>
	);
};

export default GuessTracker;
