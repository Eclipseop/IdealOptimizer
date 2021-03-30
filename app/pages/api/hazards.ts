import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cheerio from "cheerio";

interface FloorData {
	num: number;
	hazards: string[];
}

// Forgive me father for I have sinned by writing this code
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const data = (
		await axios.get("http://puzzledragonx.com/en/mission.asp?m=4720")
	).data;
	const $ = cheerio.load(data);
	$("#tabledrop tr").each((i, item) => {
		const ele = $(item);

		if (ele.children().length != 8) {
			return;
		}
		const floorNum = $(ele.children().get(0)).html();
		if (floorNum == "FLR") {
			return;
		}

		const skills = $(ele.children().get(7));
		const html = skills.html();
		const hazards = [];
		if (html.includes("Resolve")) {
			if (html.includes("Super")) {
				hazards.push("SuperResolve");
			} else {
				hazards.push("Resolve");
			}
		} else if (html.includes("Disable active skills")) {
			hazards.push("SkillBind");
		} else if (html.includes("Increases skyfall chance of Jammer orbs")) {
			hazards.push("Skyfall_Jammer");
		} else if (html.includes("Disable awoken skills")) {
			hazards.push("AwokenBind");
		} else if (html.includes("spawn Poison orbs")) {
			hazards.push("PoisonSpawn");
		} else if (html.includes("into bomb")) {
			hazards.push("BombSpawn");
		} else if (html.includes("Randomly hide")) {
			hazards.push("Blind");
		} else if (html.includes("Absorbs single hit damage over")) {
			hazards.push("DmgAbsorb");
		} else if (html.includes(" damage you cause for combos")) {
			hazards.push("ComboShield");
			//TODO: find the actual combo number
		} else if (html.includes("are unmatchable")) {
			hazards.push("Unmatchable");
			//TODO: Find actual color
		}

		const BIG_DATA: FloorData = {
			num: +floorNum,
			hazards: hazards,
		};
		console.log(BIG_DATA);
	});

	res.json({ name: "test" });
};
