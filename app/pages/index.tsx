import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import axios from "axios";

import DisplayData from "./comps/FloorData";
import OverallData from "./comps/OverallData";

const App: React.FC = () => {
	const [link, setLink] = useState("");
	const [dungeonData, setData] = useState<DungeonData>({
		dungeonName: "",
		floorData: [],
	});

	useEffect(() => {
		const load = async () => {
			if (!link.includes("puzzledragonx.com/en/mission.asp?m=")) {
				return;
			}
			const match = link.match(/\d+/)[0];

			const res = await axios.get("/api/hazards?id=" + match);
			setData(res.data);
		};
		load();
	}, [link]);

	return (
		<div className="bg-gray-800 h-max min-h-screen">
			<div className="flex flex-col mx-auto max-w-xl">
				<h1 className="text-white mx-auto text-lg">
					Enter a PADX link:
				</h1>
				<input
					type="text"
					className="rounded p-1 outline-none"
					value={link}
					onChange={(e) => setLink(e.target.value)}
				></input>
				<br></br>
				<div
					className={
						"text-green-300 " +
						(dungeonData.dungeonName.length > 1 || !link
							? "invisible z-10 h-0"
							: "")
					}
				>
					Loading...
				</div>
				<div className="grid grid-cols-2">
					<DisplayData link={link} data={dungeonData} />
					<OverallData data={dungeonData} />
				</div>
			</div>
		</div>
	);
};

export default App;
