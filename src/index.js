import React from "react";
import ReactDOM from "react-dom";
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
			const players = names.map(name => new Player(name));
			players[0].isTurn = true;
			this.setState({
				players: players,
				start: true,
			});
		} else {
			alert("You need at least two players for wizard!");
		}
	}

	initLeaderboard() {}

	updateRound(players, round) {
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
