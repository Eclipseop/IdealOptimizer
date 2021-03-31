import React, { useState } from "react";
import "tailwindcss/tailwind.css";

import DisplayData from "./comps/Data";

const App: React.FC = () => {
	const [link, setLink] = useState("");

	return (
		<div className="bg-gray-800 h-screen">
			<div className="flex flex-col mx-auto max-w-md">
				<h1 className="text-white mx-auto text-lg">
					Enter a PADX link:
				</h1>
				<input
					type="text"
					className="rounded"
					value={link}
					onChange={(e) => setLink(e.target.value)}
				></input>
				<br></br>
				<DisplayData link={link} />
			</div>
		</div>
	);
};

export default App;
