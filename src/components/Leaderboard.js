import React from "react";
import Box from "@material-ui/core/Box";

const Leaderboard = () => {
	return <div className="leaderboard"></div>;
};

function playerBox(props) {
	return (
		<Box className="player-box">
			<div className="player-name"> Name </div>
			<div className="player-score"> Score </div>
		</Box>
	);
}

export default Leaderboard;
