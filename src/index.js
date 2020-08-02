import React from "react";
import ReactDOM from "react-dom";
import Swal from "sweetalert2";
//import { CSSTransition } from "react-transition-group";

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
			round: 1,
			start: false,
		};
	}

	getPlayerNames(playerNames) {
		const names = playerNames.filter(x => x);
		if (names.length > 1) {
			const players = names.map(name => new Player(name)); // create player objs
			const numOfRounds = 60 / players.length;
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

	getWinner(players) {
		const sorted = players.slice().sort((a, b) => a.score - b.score);
		return players[sorted.length - 1].name;
	}

	updateRound(players, round) {
		if (round === this.state.numOfRounds) {
			const winner = this.getWinner(players);
			Swal.fire("Congratulations " + winner + " !", "You won!", "success");
		}
		this.setState({
			players: players,
			round: round,
		});
	}

	render() {
		return (
			<div>
				<NavBar />
				<div className="page">
					<Leaderboard initLeaderboard={this.initLeaderboard} />
					{this.state.start ? (
						<GuessTracker
							players={this.state.players}
							round={this.state.round}
							updateRound={(players, round) => this.updateRound(players, round)}
						></GuessTracker>
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
