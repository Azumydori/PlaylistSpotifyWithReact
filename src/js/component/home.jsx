import React from "react";
import SongPlaylist from "./songplaylist.jsx";

const BASE_URL = "https://assets.breatheco.de/apis/sound/";

//create your first component
const Home = () => {
	return (
		<div>
			<SongPlaylist />
		</div>
	);
};
export default Home;
