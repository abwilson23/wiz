import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";

const GuessTracker = props => {
	const [players, setPlayers] = useState(props.players);

	// Don't think I need this.
	//useEffect(() => {
	//	setPlayers(props.players);
	//}, [props.players]);

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
			setPlayers(updateScores(players));
			props.updateRound(players, props.round + 1);
		};
	}

	function updateScores(players) {
		let updatedPlayers = players.slice();
		for (let i = 0; i < updatedPlayers.length; i++) {
			let p = updatedPlayers[i];
			let ct = parseInt(p.currentTricksWon);
			let cg = parseInt(p.currentGuess);
			if (isNaN(ct) || ct === cg) {
				p.score += 2 + ct;
			} else {
				p.score -= Math.abs(ct - cg);
			}
		}
		return updatedPlayers;
	}

	return (
		<div className="container">
			<div className="input-message">
				Round {props.round}! You can leave the Tricks Won box blank if you
				guessed correctly.
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
