import { useState, useEffect } from "react";
import "./Game.css";
import emitter from "./utils/emitter";

const Grid = (props) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialState = [
		{ id: 1, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 2, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 3, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 4, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 5, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 6, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 7, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 8, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 9, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 10, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 11, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 12, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 13, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 14, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 15, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 16, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 17, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 18, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 19, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 20, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 21, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 22, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 23, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 24, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 25, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 26, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 27, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 28, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 29, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 30, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 31, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 32, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 33, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 34, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 35, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 36, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 37, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 38, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 39, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 40, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 41, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 42, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 43, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 44, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 45, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 46, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 47, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 48, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 49, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 50, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 51, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 52, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 53, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 54, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 55, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 56, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 57, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 58, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 59, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 60, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 61, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 62, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 63, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 64, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 65, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 66, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 67, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 68, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 69, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 70, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 71, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 72, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 73, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 74, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 75, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 76, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 77, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 78, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 79, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 80, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 81, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 82, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 83, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 84, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 85, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 86, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 87, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 88, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 89, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 90, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 91, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 92, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 93, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 94, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 95, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 96, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 97, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 98, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 99, selected: false, locked: false, ownedBy: null, win: false },
		{ id: 100, selected: false, locked: false, ownedBy: null, win: false },
	];

	const [squares, setSquares] = useState(initialState);

	// handles the 'Submit Picks' button to lock squares that have been selected
	useEffect(() => {
		let squaresSelected = 0;
		const listener = emitter.addListener("submitSquares", () => {
			let copy = [...squares];
			// eslint-disable-next-line array-callback-return
			squares.map((s) => {
				if (s.selected) {
					copy[s.id - 1].selected = false;
					copy[s.id - 1].locked = true;
					copy[s.id - 1].ownedBy = props.userId;

					squaresSelected++;
				}
			});
			setSquares(copy);
			emitter.emit("updateSquaresSelected", squaresSelected);
		});
		return () => listener.remove();
	}, [props.userId, squares]);

	// handles Start Game button
	useEffect(() => {
		const listener = emitter.addListener("gameStarted", () => {
			let copy = [...squares];
			// eslint-disable-next-line array-callback-return
			squares.map((s) => {
				if (s.selected) {
					copy[s.id - 1].selected = false;
				}
			});
			setSquares(copy);
		});
		return () => listener.remove();
	}, [squares]);

	// handles the New Game button
	useEffect(() => {
		const listener = emitter.addListener("newGame", () => {
			setSquares(initialState);
		});
		return () => listener.remove();
	}, [initialState]);

	// handles scoring the winners
	useEffect(() => {
		const listener = emitter.addListener("scoreWinners", (home, away) => {
			// clear out winning squares before re-setting them to make sure there are no issues
			const copy = [...squares];
			// eslint-disable-next-line array-callback-return
			squares.map((s) => {
				if (s.win) {
					copy[s.id - 1].win = false;
				}
			});
			let homeScore = 0;
			let awayScore = 0;
			for (let i = 0; i < 4; i++) {
				// only score winners if both home & away scores are filled in for the quarter
				if (!isNaN(+home[i]) && !isNaN(+away[i])) {
					homeScore += parseInt(home[i]);
					awayScore += parseInt(away[i]);
					// extract 1's digit
					const homeLast = homeScore % 10;
					const awayLast = awayScore % 10;
					// use x and y axis to pinpoint winning square
					const winningId =
						props.awayDigits.indexOf(awayLast) * 10 +
						props.homeDigits.indexOf(homeLast);
					copy[winningId].win = true;
				}
			}
			setSquares(copy);
		});
		return () => listener.remove();
	});

	// handles the action of clicking on a square
	const handleClick = (id) => {
		if (!props.gameStarted && props.userId >= 0) {
			if (!squares[id - 1].locked) {
				const copy = [...squares];
				copy[id - 1].selected = !copy[id - 1].selected;
				setSquares(copy);
			}
		}
	};

	function setClassName(square) {
		let c = "square";
		if (square.ownedBy === props.userId) {
			c += " highlighted";
		} else {
			if (square.locked) {
				c += " locked";
			}
			if (square.selected) {
				c += " selected";
			}
		}
		if (square.win) {
			c += " win";
		}
		return c;
	}

	function setTitle(square) {
		if (props.userId < 0) {
			return "Please select an active user";
		}
		if (square.locked) {
			return "Owned by: " + props.userList[square.ownedBy].name;
		}
		return null;
	}

	return (
		<div className="grid">
			{squares.map((s) => {
				return (
					<button
						key={s.id}
						className={setClassName(squares[s.id - 1])}
						onClick={() => handleClick(s.id)}
						title={setTitle(squares[s.id - 1])}
					/>
				);
			})}
		</div>
	);
};

export default Grid;
