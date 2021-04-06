import React from "react";

import GetImage from "./util/GetImage";

interface Props {
	data: DungeonData;
}

const OverallData: React.FC<Props> = (props: Props) => {
	const getUnique = (): string[] => {
		const temp = [];
		props.data.floorData
			.map((v) => v.hazards)
			.forEach((v) =>
				v.forEach((v1) => {
					if (!temp.includes(v1)) {
						temp.push(v1);
					}
				})
			);
		return temp;
	};

	return (
		<div
			className={
				"text-green-300 " +
				(props.data.dungeonName.length > 1 ? "" : "invisible")
			}
		>
			<h1 className="text-lg font-bold">Checklist</h1>
			{[...getUnique()].map((e) => {
				return <p>{GetImage(e)}</p>;
			})}
		</div>
	);
};

export default OverallData;
