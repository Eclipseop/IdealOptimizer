interface DungeonData {
	dungeonName: string;
	floorData: {
		num: number;
		hazards: string[];
	}[];
}
