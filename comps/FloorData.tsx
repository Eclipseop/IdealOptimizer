/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';

import GetImage from './util/GetImage';

interface Props {
    // eslint-disable-next-line no-undef
    data: DungeonData;
}

const DisplayData: React.FC<Props> = (props: Props) => {
    const possibleHazards = (floor: number): string[] => {
        const temp = [];
        props.data.floorData
            .filter((p) => p.num === floor)
            .map((p) => p.hazards)
            .forEach((e) => e.forEach((e1) => (temp.includes(e1) ? undefined : temp.push(e1))));
        return temp;
    };

    const parseFloor = (floor: number) => {
        const ph = possibleHazards(floor);
        if (ph.length === 0) {
            return <div />;
        }
        return (
            <div className="break-all" key={floor}>
                {floor}
                <div className="flex flex-row gap-5">
                    {ph.map((e) => GetImage(e))}
                </div>
            </div>
        );
    };

    return (
        <div className="text-green-300">
            <h1 className="text-lg font-bold">{props.data.dungeonName}</h1>
            <div className="grid">
                {[...Array(props.data.floorData.length)].map((e, i) => parseFloor(i))}
            </div>
        </div>
    );
};

export default DisplayData;
