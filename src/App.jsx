import Game from "./Game";
import Login from "./Login";
import Register from "./Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<main className="App">
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Game />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
