import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const NavBar = () => {
	const style = {
		backgroundColor: "#035AA6",
		alignItems: "center",
	};

	return (
		<div className="nav-bar">
			<AppBar style={style}>
				<Toolbar>
					<Typography variant="h3">Wizard Scorekeeper</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;
