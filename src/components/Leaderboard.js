import React from "react";

const Leaderboard = props => {
	const sorted = props.players.sort((a, b) => b.score - a.score);
	return (
		<div className="leaderboard">
			<div className="leaderboard-title">Leaderboard</div>
			{sorted.map((player, i) => (
				<div id={"place" + i} className="player-box">
					<div className="player-name"> {player.name} </div>
					<div className="player-score"> {player.score} </div>
				</div>
			))}
		</div>
	);
};

export default Leaderboard;
