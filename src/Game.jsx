import { useState, useEffect, useRef } from "react";
import Grid from "./Grid";
import Team from "./Team";
import BoxScore from "./BoxScore";
import "./Game.css";
import emitter from "./utils/emitter";

const Game = () => {
	const initialValues = {
		userList: [],
		activeUser: -1,
		league: { name: "NBA", scoringChances: 4 },
		homeTeam: { city: "", name: "Home", logo: null },
		homeDigits: [],
		awayTeam: { city: "", name: "Away", logo: null },
		awayDigits: [],
		gameStarted: false,
		squarePrice: 1,
		totalPot: 0,
	};

	// state values
	const [userList, setUserList] = useState(initialValues.userList);
	const [activeUser, setActiveUser] = useState(initialValues.activeUser);
	const [league, setLeague] = useState(initialValues.league);
	const [homeTeam, setHomeTeam] = useState(initialValues.homeTeam);
	const [homeDigits, setHomeDigits] = useState(initialValues.homeDigits);
	const [awayTeam, setAwayTeam] = useState(initialValues.awayTeam);
	const [awayDigits, setAwayDigits] = useState(initialValues.awayDigits);
	const [gameStarted, setGameStarted] = useState(initialValues.gameStarted);
	const [squarePrice, setSquarePrice] = useState(initialValues.squarePrice);
	const [totalPot, setTotalPot] = useState(initialValues.totalPot);

	const [userId, setUserId] = useState(1);

	const newUserRef = useRef(null);

	// reset all state values
	const newGame = () => {
		emitter.emit("newGame");
		setUserList(initialValues.userList);
		setActiveUser(initialValues.activeUser);
		setLeague(initialValues.league);
		setHomeTeam(initialValues.homeTeam);
		setHomeDigits(initialValues.homeDigits);
		setAwayTeam(initialValues.awayTeam);
		setAwayDigits(initialValues.awayDigits);
		setGameStarted(initialValues.gameStarted);
		setSquarePrice(initialValues.squarePrice);
		setTotalPot(initialValues.totalPot);
		setUserId(1);
	};

	function displayLeague() {
		if (league.name === "NFL") {
			return require("./img/nfl/nfl_logo.png");
		} else if (league.name === "NBA") {
			return require("./img/nba/nba_logo.png");
		} else {
			return require("./img/etc/panik.png");
		}
	}

	// helper function to return a randomized vector of 0-9
	function randomizeDigits() {
		let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let i = digits.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i - 1));
			const temp = digits[i];
			digits[i] = digits[j];
			digits[j] = temp;
		}
		return digits;
	}

	// display the digits and start the game
	const startGame = () => {
		if (!gameStarted) {
			setGameStarted(true);
			setHomeDigits(randomizeDigits());
			setAwayDigits(randomizeDigits());
			emitter.emit("gameStarted");
		}
	};

	// gray out the start button if it doesn't meet the criteria
	function disableStartGameBtn() {
		if (gameStarted) {
			return true;
		} else {
			if (homeTeam.name === "Home" || awayTeam.name === "Away") {
				return true;
			} else {
				return false;
			}
		}
	}

	// handles setting the home/away team if it's clicked in the drop down
	useEffect(() => {
		const listener = emitter.addListener("setTeam", (team, isHome) => {
			if (isHome) {
				setHomeTeam(team);
			} else {
				setAwayTeam(team);
			}
		});
		return () => listener.remove();
	}, []);

	// updates the table value that displays the number of squares owned for each user
	useEffect(() => {
		const listener = emitter.addListener(
			"updateSquaresSelected",
			(squaresSelected) => {
				let copy = [...userList];
				const addedToPot = squaresSelected * squarePrice;
				copy[activeUser].squaresOwned += squaresSelected;
				copy[activeUser].balance -= addedToPot;
				setUserList(copy);
				setTotalPot(totalPot + addedToPot);
			}
		);
		return () => listener.remove();
	}, [activeUser, squarePrice, totalPot, userList]);

	// adds a new user to the list and increments the user id
	function addNewUser() {
		const newUser = newUserRef.current.value;
		if (newUser !== "") {
			let copy = [
				...userList,
				{
					id: userId,
					name: newUser,
					squaresOwned: 0,
					wins: 0,
					balance: 0,
				},
			];
			setUserList(copy);
			setUserId(userId + 1);
		}
		newUserRef.current.value = "";
	}

	// sends the active user to the GRID component
	const highlightActiveUser = (user) => {
		setActiveUser(user.id - 1);
		emitter.emit("highlightSquares", user.id);
	};

	// displays each user's balance in the user list
	const displayUserBalance = (user) => {
		let balance =
			user.balance + (user.wins * totalPot) / league.scoringChances;
		let balance_str = "$" + Math.abs(balance);

		if (balance < 0) {
			balance_str = "-" + balance_str;
		}
		return balance_str;
	};

	return (
		<>
			<div className="gameBoard">
				<div className="league">
					<img src={displayLeague()} alt="logo" />
				</div>
				<div className="home center">
					<Team
						league={league.name}
						team={homeTeam}
						isHome={true}
						gameStarted={gameStarted}
					/>
					<h2 className="homeDigits">
						{homeDigits.map((d) => {
							return <li key={d}>{d}</li>;
						})}
					</h2>
				</div>
				<Grid
					userId={activeUser}
					userList={userList}
					homeDigits={homeDigits}
					awayDigits={awayDigits}
					gameStarted={gameStarted}
				/>
				<div className="away center">
					<Team
						league={league.name}
						team={awayTeam}
						isHome={false}
						gameStarted={gameStarted}
					/>
					<h2 className="awayDigits">
						{awayDigits.map((d) => {
							return (
								<li
									key={d}
									style={{ transform: "rotate(270deg)" }}
								>
									{d}
								</li>
							);
						})}
					</h2>
				</div>
			</div>
			<div className="right-panel">
				<div className="gameButtons">
					<button
						onClick={() => emitter.emit("submitSquares")}
						disabled={gameStarted}
					>
						Submit Picks
					</button>
					<button
						onClick={startGame}
						disabled={disableStartGameBtn()}
						title={
							gameStarted ? "" : "Please select a home/away team"
						}
					>
						Start Game
					</button>
					<button onClick={newGame}>Reset Game</button>
				</div>
				<div className="user-list">
					<span>
						Squares are ${squarePrice} each. Pot is ${totalPot}.
					</span>
					<br />
					<table>
						<tbody>
							<tr>
								<th>Name</th>
								<th>Squares Owned</th>
								<th>Wins</th>
								<th>Balance</th>
							</tr>
							{userList.map((user) => {
								return (
									<tr
										key={user.id}
										onClick={() =>
											highlightActiveUser(user)
										}
										style={
											activeUser === user.id - 1
												? {
														background:
															"rgb(255, 238, 45)",
												  }
												: {}
										}
									>
										<td>{user.name}</td>
										<td>{user.squaresOwned}</td>
										<td>{user.wins}</td>
										<td>{displayUserBalance(user)}</td>
									</tr>
								);
							})}
							{gameStarted ? (
								<></>
							) : (
								<tr>
									<td colSpan="2">
										<input
											type="text"
											id="newUser"
											name="newUser"
											maxLength="16"
											ref={newUserRef}
										/>
									</td>
									<td colSpan="2">
										<button onClick={addNewUser}>
											Add new user
										</button>
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
				<div className="boxScore">
					<BoxScore
						homeTeam={homeTeam}
						awayTeam={awayTeam}
						gameStarted={gameStarted}
						numScores={league.scoringChances}
					/>
				</div>
			</div>
		</>
	);
};

export default Game;
