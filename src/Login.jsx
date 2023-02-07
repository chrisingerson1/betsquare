import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import md5 from "md5";
import axios from "./api/axios";

const Login = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const hashPwd = md5(pwd);
			const response = await axios.post(
				"/login",
				JSON.stringify({ user, pwd: hashPwd }),
				{
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
					//withCredentials: true,
				}
			);
			console.log(JSON.stringify(response?.data));

			//const accessToken = response?.data?.accessToken;
			//const roles = response?.data?.roles;
			setUser("");
			setPwd("");
			setSuccess(true);
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
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<section>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<Link to="/">Go to home</Link>
					</p>
				</section>
			) : (
				<section>
					<p
						ref={errRef}
						className={errMsg ? "errmsg" : "offscreen"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Sign In</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						/>
						<button>Sign In</button>
					</form>
					<button onClick={() => navigate("/register")}>
						Create an account
					</button>
					<button>Continue as Guest</button>
				</section>
			)}
		</>
	);
};

export default Login;
