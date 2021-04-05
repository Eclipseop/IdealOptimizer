import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
	link: string;
}

interface DungeonData {
	dungeonName: string;
	floorData: FloorData[];
}

interface FloorData {
	num: number;
	hazards: string[];
}

const DisplayData: React.FC<Props> = (props: Props) => {
	const [data, setData] = useState<DungeonData>({
		dungeonName: "",
		floorData: [],
	});

	useEffect(() => {
		const f = async () => {
			if (!props.link.includes("puzzledragonx.com/en/mission.asp?m=")) {
				return;
			}
			const match = props.link.match(/\d+/)[0];

			const res = await axios.get("/api/hazards?id=" + match);
			setData(res.data);
		};
		f();
	}, [props.link]);

	const possibleHazards = (floor: number): string[] => {
		const temp = [];
		data.floorData
			.filter((p) => p.num == floor)
			.map((p) => p.hazards)
			.forEach((e) =>
				e.forEach((e1) =>
					temp.includes(e1) ? undefined : temp.push(e1)
				)
			);
		return temp;
	};

	const test = (floor: number) => {
		const ph = possibleHazards(floor);
		if (ph.length == 0) {
			return <div></div>;
		}
		return (
			<div className="break-all">
				{floor} - {JSON.stringify(ph)}
			</div>
		);
	};

	return (
		<div className="text-green-300">
			<h1 className=" text-lg">{data.dungeonName}</h1>
			<div className="grid">
				{[...Array(data.floorData.length)].map((e, i) => {
					return test(i);
				})}
			</div>
		</div>
	);
};

export default DisplayData;
