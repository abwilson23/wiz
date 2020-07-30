import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";

const PlayerInput = props => {
	const [player1, setPlayer1] = useState("");
	const [player2, setPlayer2] = useState("");
	const [player3, setPlayer3] = useState("");
	const [player4, setPlayer4] = useState("");
	const [player5, setPlayer5] = useState("");
	const [player6, setPlayer6] = useState("");

	const playerNames = [player1, player2, player3, player4, player5, player6];

	return (
		<div>
			<div className="input-message">
				<p>Enter the player names in your seating order. </p>
				<p>Leave extra boxes empty for fewer than 6 players.</p>
				<p>Prepare for leading suits, wizardry, and hijinx.</p>
			</div>
			<div className="player-input">
				<TextField
					value={player1}
					label="Player 1"
					variant="outlined"
					onChange={e => setPlayer1(e.target.value)}
				/>
				<TextField
					value={player2}
					label="Player 2"
					variant="outlined"
					onChange={e => setPlayer2(e.target.value)}
				/>
				<TextField
					value={player3}
					label="Player 3"
					variant="outlined"
					onChange={e => setPlayer3(e.target.value)}
				/>
				<TextField
					value={player4}
					label="Player 4"
					variant="outlined"
					onChange={e => setPlayer4(e.target.value)}
				/>
				<TextField
					value={player5}
					label="Player 5"
					variant="outlined"
					onChange={e => setPlayer5(e.target.value)}
				/>
				<TextField
					value={player6}
					label="Player 6"
					variant="outlined"
					onChange={e => setPlayer6(e.target.value)}
				/>
			</div>
			<div className="start-button">
				<Button
					variant="contained"
					color="primary"
					onClick={() => props.getPlayerNames(playerNames)}
				>
					Commence
				</Button>
			</div>
		</div>
	);
};

export default PlayerInput;
