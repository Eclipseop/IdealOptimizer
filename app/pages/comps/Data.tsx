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
			return;
		}
		return (
			<div className="break-all" key={floor}>
				{floor}-
				<div className="grid grid-cols-10">
					{ph.map((e) => {
						return getImage(e);
					})}
				</div>
			</div>
		);
	};

	const getImage = (id) => {
		let tag = "/imgs/";
		switch (id) {
			case "Resolve":
				tag += "resolve.png";
				break;
			case "PoisonSpawn":
				tag += "poison.png";
				break;
			case "ComboShield":
				tag += "combo.png";
				break;
			case "Tape":
				tag += "tape.png";
				break;
			case "Blind":
			case "SuperBlind":
				tag += "blind.png";
				break;
			case "SkillBind":
				tag += "sbr.png";
				break;
			case "VDP":
				tag += "vdp.png";
				break;
			case "Cloud":
				tag += "cloud.png";
				break;
			case "AwokenBind":
				tag += "abind.png";
				break;
			case "Skyfall_Jammer":
				tag += "jammer_surge.png";
				break;
			default:
				tag += id;
		}

		return <img src={tag} width="30" height="30"></img>;
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
