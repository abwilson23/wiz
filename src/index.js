import React from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";

import NavBar from "./components/NavBar";
import Leaderboard from "./components/Leaderboard";
import PlayerInput from "./components/PlayerInput";
import GuessTracker from "./components/GuessTracker";

import "./index.css";
import "fontsource-roboto";

class Player {
	constructor(name) {
		this.name = name;
		this.score = 0;
		this.currentGuess = "";
		this.currentTricksWon = "";
		this.isTurn = false;
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
			round: 0,
			start: false,
			numOfRounds: null,
		};
	}

	getPlayerNames(playerNames) {
		const names = playerNames.filter(x => x);
		if (names.length > 1) {
			const players = names.map(name => new Player(name)); // create player objs
			const numOfRounds = 2; //60 / players.length;
			players[0].isTurn = true; // set first player to be dealer
			this.setState({
				players: players,
				start: true,
				numOfRounds: numOfRounds,
			});
		} else {
			alert("You need at least two players for wizard!");
		}
	}

	updateRound(players, round) {
		if (round === this.state.numOfRounds) {
			this.endGame(players);
		}
		this.setState({
			players: players,
			round: round,
		});
	}

	endGame(players) {
		const winner = this.getWinner(players);
		Swal.fire({
			title: "Congratulations " + winner + "!",
			text: "You won!",
			icon: "success",
			confirmButtonText: "New Game?",
		}).then(result => {
			if (result.value) {
				window.location.reload(true);
			}
		});
	}

	getWinner(players) {
		const sorted = players.slice().sort((a, b) => a.score - b.score);
		const max_score = sorted[sorted.length - 1].score;
		const winners = sorted.filter(element => element.score === max_score);
		let winner_string = "";
		switch (winners.length) {
			case 1:
				winner_string = winners[0].name;
				break;
			case 2:
				winner_string = winners[0].name + " and " + winners[1].name;
				break;
			case 3:
				winner_string =
					winners[0].name + ", " + winners[1].name + ", and " + winners[2].name;
				break;
			default:
				winner_string = "everyone..?";
		}
		return winner_string;
	}

	render() {
		return (
			<div>
				<NavBar />
				<div className="page">
					{this.state.start ? (
						<React.Fragment>
							<Leaderboard players={this.state.players} />
							<GuessTracker
								players={this.state.players}
								round={this.state.round}
								updateRound={(players, round) =>
									this.updateRound(players, round)
								}
							></GuessTracker>
						</React.Fragment>
					) : null}
					{!this.state.start ? (
						<PlayerInput
							// Is this best practice? Arrow functions automatically bind 'this' to their
							// parent context. Here, that is the Game component
							getPlayerNames={playerNames => this.getPlayerNames(playerNames)}
						></PlayerInput>
					) : null}
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ========================================
