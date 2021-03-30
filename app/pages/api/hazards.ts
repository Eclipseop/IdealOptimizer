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
		await axios.get("http://puzzledragonx.com/en/mission.asp?m=4552")
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
			hazards.push("Resolve");
		}

		const BIG_DATA: FloorData = {
			num: +floorNum,
			hazards: hazards,
		};
		console.log(BIG_DATA);
	});

	res.json({ name: "test" });
};
