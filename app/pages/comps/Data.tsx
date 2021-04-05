import React from "react";

interface Props {
	link: string;
	data: DungeonData;
}

const DisplayData: React.FC<Props> = (props: Props) => {
	const possibleHazards = (floor: number): string[] => {
		const temp = [];
		props.data.floorData
			.filter((p) => p.num == floor)
			.map((p) => p.hazards)
			.forEach((e) =>
				e.forEach((e1) =>
					temp.includes(e1) ? undefined : temp.push(e1)
				)
			);
		return temp;
	};

	const parseFloor = (floor: number) => {
		const ph = possibleHazards(floor);
		if (ph.length == 0) {
			return;
		}
		return (
			<div className="break-all" key={floor}>
				{floor}
				<div className="flex flex-row gap-5">
					{ph.map((e) => {
						return getImage(e);
					})}
				</div>
			</div>
		);
	};

	const getImage = (id: string) => {
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
			case "BombSpawn":
				tag += "jammer.png";
				break;
			case "SuperResolve":
				tag += "sresolve.png";
				break;
			case "Unmatchable":
				tag += "unmatch.png";
				break;
			case "DmgAbsorb":
				tag += "dmgAb.png";
				break;
			case "7x6":
				tag += "7x6.png";
				break;
			default:
				tag += id;
		}

		return <img src={tag} width="30" height="30" title={id}></img>;
	};

	return (
		<div className="text-green-300">
			<h1 className=" text-lg">{props.data.dungeonName}</h1>
			<div className="grid">
				{[...Array(props.data.floorData.length)].map((e, i) => {
					return parseFloor(i);
				})}
			</div>
		</div>
	);
};

export default DisplayData;
