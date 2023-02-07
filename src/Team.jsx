import "./Game.css";
import TeamDropdown from "./TeamDropdown";

const Team = (props) => {
	function displayLogo() {
		if (props.team?.logo !== null) {
			return (
				<img className="logo" src={props.team.logo} alt="logo"></img>
			);
		} else {
			return <></>;
		}
	}

	return (
		<div
			className="dropdown"
			style={props.isHome ? {} : { transform: "rotate(180deg)" }}
		>
			<button>
				<h1 className="center-vert header">
					{displayLogo()}
					{props.team.city + " " + props.team.name}
					{displayLogo()}
				</h1>
			</button>
			{props.gameStarted ? (
				<></>
			) : (
				<TeamDropdown league={props.league} isHome={props.isHome} />
			)}
		</div>
	);
};

export default Team;
