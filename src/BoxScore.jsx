import { useState, useEffect } from "react";
import emitter from "./utils/emitter";

const BoxScore = (props) => {
	const initialValues = {
		scores: ["___", "___", "___", "___", "___", "___", "___", "___", "___"],
		final: 0,
		clickedBox: "",
	};

	const [homeScores, setHomeScores] = useState(initialValues.scores);
	const [awayScores, setAwayScores] = useState(initialValues.scores);
	const [homeFinal, setHomeFinal] = useState(initialValues.final);
	const [awayFinal, setAwayFinal] = useState(initialValues.final);
	const [clickedBox, setClickedBox] = useState(initialValues.clickedBox);

	useEffect(() => {
		const listener = emitter.addListener("gameStarted", () => {
			setClickedBox("a0");
		});
		return () => listener.remove();
	}, []);

	useEffect(() => {
		const listener = emitter.addListener("newGame", () => {
			setHomeScores(initialValues.scores);
			setAwayScores(initialValues.scores);
			setHomeFinal(initialValues.final);
			setAwayFinal(initialValues.final);
			setClickedBox(initialValues.clickedBox);
		});
		return () => listener.remove();
	});

	function setScore(val, idx, isHome) {
		const copy = isHome ? [...homeScores] : [...awayScores];
		copy[idx] = val;

		let total = 0;
		for (let i = 0; i < props.numScores; i++) {
			if (!isNaN(+copy[i])) {
				total += parseInt(copy[i]);
			}
		}

		if (isHome) {
			setHomeScores(copy);
			setHomeFinal(total);
		} else {
			setAwayScores(copy);
			setAwayFinal(total);
		}
	}

	function tableScores(isHome) {
		let cols = [];
		for (let i = 0; i < props.numScores; i++) {
			const boxId = (isHome ? "h" : "a") + i;
			cols.push(
				<td
					className="box-col"
					key={boxId}
					onClick={() => setClickedBox(boxId)}
				>
					{props.gameStarted && clickedBox === boxId ? (
						<input
							id={boxId}
							type="text"
							maxLength="2"
							size="2"
							onChange={(score) =>
								setScore(score.target.value, i, isHome)
							}
						/>
					) : isHome ? (
						homeScores[i]
					) : (
						awayScores[i]
					)}
				</td>
			);
		}
		return cols;
	}

	function tableHeaders() {
		let cols = [];
		for (let i = 0; i < props.numScores; i++) {
			cols.push(
				<th className="center-text" key={i + 1}>
					{i + 1}
				</th>
			);
		}
		return cols;
	}

	return (
		<table>
			<thead>
				<tr>
					<th />
					{tableHeaders()}
					<th className="center-text">F</th>
				</tr>
			</thead>
			<tbody>
				<tr style={{ height: "32px" }}>
					<td>{props.awayTeam.name}</td>
					{tableScores(false)}
					<td onClick={() => setClickedBox("")}>
						<b>{!isNaN(awayFinal) ? awayFinal : 0}</b>
					</td>
				</tr>
				<tr style={{ height: "32px" }}>
					<td>{props.homeTeam.name}</td>
					{tableScores(true)}
					<td onClick={() => setClickedBox("")}>
						<b>{!isNaN(homeFinal) ? homeFinal : 0}</b>
					</td>
				</tr>
				<tr>
					<td colSpan="3">
						<button
							onClick={() =>
								emitter.emit(
									"scoreWinners",
									homeScores,
									awayScores
								)
							}
						>
							Score winners
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default BoxScore;
