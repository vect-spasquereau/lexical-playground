import viteLogo from "/vite.svg";
import biomeLogo from "./assets/biome.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
				<a href="https://biomejs.dev/" target="_blank">
					<img src={biomeLogo} className="logo biome" alt="Biome logo" />
				</a>
			</div>
			<h1>Vite + React + Biome</h1>
		</>
	);
}

export default App;
