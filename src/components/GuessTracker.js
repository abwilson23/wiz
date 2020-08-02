import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const GuessTracker = props => {
	const [players, setPlayers] = useState(props.players.slice());
	let [round, setRound] = useState(props.round);
	const [begin, setBegin] = useState(false);

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

	function beginRound() {
		return () => {
			setBegin(true);
		};
	}

	function endRound() {
		return () => {
			setPlayers(updateScores(players));
			setRound(round++);
			props.updateRound(players, round);
		};
	}

	function updateScores(players) {
		let updatedPlayers = players.slice();
		for (let i = 0; i < updatedPlayers.length; i++) {
			let p = updatedPlayers[i];
			if (p.currentTricksWon === "" || p.currentTricksWon === p.currentGuess) {
				p.score += 2 + p.currentTricksWon;
			} else {
				p.score -= Math.abs(p.currentTricksWon - p.currentGuess);
			}
		}
		return updatedPlayers;
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
							onChange={createGuessHandler(i)}
						/>
					</div>
				))}
			</div>
			{!begin ? (
				<div className="start-button">
					<Button variant="contained" color="primary" onClick={beginRound()}>
						Done Guessing
					</Button>
				</div>
			) : (
				<div>
					<div id="begin-round" className="input-message">
						<p>
							The round has begun! Record your final scores below and hit 'End
							Round' to finish.
						</p>
						<p>
							If you got the correct number of tricks, you can leave the field
							blank.
						</p>
					</div>
					<div className="player-guesses">
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
			)}
		</div>
	);
};

export default GuessTracker;
