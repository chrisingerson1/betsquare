import { useEffect, useState } from "react";
import "./Game.css";
import emitter from "./utils/emitter";
import { nbaTeams } from "./structs/nbaTeams";
import { nflTeams } from "./structs/nflTeams";

const TeamDropdown = (props) => {
	const [teams, setTeams] = useState([]);

	useEffect(() => {
		if (props?.league === "NFL") {
			setTeams(nflTeams);
		} else if (props?.league === "NBA") {
			setTeams(nbaTeams);
		}
	}, [props]);

	return (
		<div
			className="dropdown-content"
			style={props.isHome ? {} : { transform: "rotate(90deg)" }}
		>
			{teams.map((t) => {
				return (
					<span
						className="dropdown-option center-vert"
						key={t.name}
						onClick={() => emitter.emit("setTeam", t, props.isHome)}
					>
						<img
							className="dropdown-logo"
							src={t.logo}
							alt={t.name + " logo"}
						/>
						{t.city + " " + t.name}
					</span>
				);
			})}
		</div>
	);
};

export default TeamDropdown;
