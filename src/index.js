import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Button, Box } from "@material-ui/core";
import NavBar from "./components/NavBar";
import Leaderboard from "./components/Leaderboard";
import PlayerInput from "./components/PlayerInput";

import "./index.css";
import "fontsource-roboto";

class Player {
	constructor(name) {
		this.name = name;
	}
}

function playerBox(props) {
	return (
		<Box className="player-box">
			<div className="player-name"> Name </div>
			<div className="player-score"> Score </div>
		</Box>
	);
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			players: [],
		};
	}

	getPlayerNames() {}

	initLeaderboard() {}

	render() {
		return (
			<div>
				<NavBar />
				<div className="page">
					<Leaderboard initLeaderboard={this.initLeaderboard} />
					<PlayerInput getPlayerNames={this.getPlayerNames}></PlayerInput>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ========================================
