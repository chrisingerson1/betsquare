import { useState } from "react";
import { useNavigate } from "react-router-dom";

import md5 from "md5";
import axios from "./api/axios";

const Register = () => {
	const [name, setName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [errMsg, setErrMsg] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log(name, dateOfBirth, username, password, email);

		try {
			const hashPwd = md5(password);
			const response = axios.post(
				"/register",
				JSON.stringify({ name, dateOfBirth, username, hashPwd, email }),
				{
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No server response");
			} else if (err.response?.status === 400) {
				setErrMsg("Bad request");
			} else if (err.response?.status === 401) {
				setErrMsg("Incorrect username or password");
			} else if (err.response?.status === 403) {
				setErrMsg("Access forbidden");
			} else {
				setErrMsg("Login failed");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="name">Name:</label>
			<input
				type="text"
				id="name"
				onChange={(e) => setName(e.target.value)}
				value={name}
				required
			/>
			<label htmlFor="dob">Date of Birth:</label>
			<input
				type="date"
				id="dob"
				onChange={(e) => setDateOfBirth(e.target.value)}
				value={dateOfBirth}
				required
			/>
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				id="username"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				required
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				required
			/>
			<label htmlFor="email">Email:</label>
			<input
				type="text"
				id="email"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				required
			/>
			<button onClick={() => navigate("/login")}>Sign Up</button>
		</form>
	);
};

export default Register;
