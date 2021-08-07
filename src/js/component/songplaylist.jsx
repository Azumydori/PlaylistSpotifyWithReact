import React, { useEffect, useState } from "react";

const BASE_URL = "https://assets.breatheco.de/apis/sound/";

const SongPlaylist = () => {
	const [mapList, setMapList] = useState([]);
	const [playSong, setPlaySong] = useState({});
	useEffect(() => {
		fetch(BASE_URL.concat("songs"), {
			method: "GET"
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then(responseAsJson => {
				setMapList(responseAsJson);
			})
			.catch(error => {
				console.log("whoops", error);
			});
	}, []);

	let songPlaylist = mapList.map((tune, index) => {
		return (
			<li
				onEnded={() => {
					nextSong();
				}}
				{...tune.name}
				className="songName"
				key={index.toString()}
				onClick={() => {
					setPlaySong({
						url: tune.url,
						name: tune.name,
						position: index
					});
					console.log(tune.url);
				}}>
				{tune.name}
			</li>
		);
	});

	useEffect(() => {
		if (mapList.length > 0) {
			setPlaySong({ ...mapList[0], position: 0 });
		}
	}, [mapList]);

	const nextSong = () => {
		let position = playSong.position + 1;
		if (position < mapList.length) {
			setPlaySong({
				...mapList[position],
				position: position
			});
		} else {
			setPlaySong({
				...mapList[0],
				position: 0
			});
		}
	};

	const previousSong = () => {
		let position = playSong.position - 1;
		if (position < mapList.length) {
			setPlaySong({
				...mapList[position],
				position: position
			});
		} else {
			setPlaySong({
				...mapList[0],
				position: 0
			});
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-10">
					<h1 className="Title offset-4">
						MY SPOTIFY PLAYLIST <i className="fab fa-spotify"></i>{" "}
					</h1>
				</div>
				<ul className="playlist col-10 font-weight-bold offset-3 p-2">
					{songPlaylist}
				</ul>
			</div>
			<div className="row">
				<div className="music-player text-center font-weight-bold">
					<figure>
						<figcaption>{playSong.name}</figcaption>
						<button
							className="btn "
							onClick={() => {
								previousSong();
							}}>
							<i className="fas fa-arrow-circle-left"></i>
						</button>
						<audio
							src={BASE_URL.concat(playSong.url)}
							controls
							onEnded={() => nextSong()}></audio>
						<button
							className="btn"
							offset-4
							onClick={() => {
								nextSong();
							}}>
							<i className="fas fa-arrow-circle-right"></i>
						</button>
					</figure>
				</div>
			</div>
		</div>
	);
};
export default SongPlaylist;
