import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';

interface FloorData {
    num: number;
    hazards: string[];
}

// Forgive me father for I have sinned by writing this code
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const dungId = req.query.id;
    const { data } = await axios.get(`http://puzzledragonx.com/en/mission.asp?m=${dungId}`);
    const $ = cheerio.load(data);

    const temp = {
        dungeonName: '',
        floorData: [],
    };

    // eslint-disable-next-line prefer-destructuring
    temp.dungeonName = $('head title').text().split(' |')[0];

    $('#tabledrop tr').each((i, item) => {
        const ele = $(item);

        if (ele.children().length !== 8) {
            return;
        }
        const floorNum = $(ele.children().get(0)).html();
        if (floorNum === 'FLR') {
            return;
        }

        const skills = $(ele.children().get(7));
        const html = skills.html();
        const hazards = [];
        if (html.includes('Resolve')) {
            if (html.includes('Super')) {
                hazards.push('SuperResolve');
            } else {
                hazards.push('Resolve');
            }
        }
        if (html.includes('Disable active skills')) {
            hazards.push('SkillBind');
        }
        if (html.includes('Increases skyfall chance of Jammer orbs')) {
            hazards.push('Skyfall_Jammer');
        }
        if (html.includes('Disable awoken skills')) {
            hazards.push('AwokenBind');
        }
        if (html.includes('spawn Poison orbs')) {
            hazards.push('PoisonSpawn');
        }
        if (html.includes('into bomb')) {
            hazards.push('BombSpawn');
        }
        if (html.includes('Randomly hide') || html.includes('Hide the following')) {
            hazards.push('SuperBlind');
        }
        if (html.includes('Absorbs single hit damage over')) {
            hazards.push('DmgAbsorb');
        }
        if (html.includes(' damage you cause for combos')) {
            hazards.push('ComboShield');
            // TODO: find the actual combo number
        }
        if (html.includes('are unmatchable')) {
            hazards.push('Unmatchable');
            // TODO: Find actual color
        }
        if (html.includes('Immune single hit damage over')) {
            hazards.push('VDP');
        }
        if (html.includes('Clouds appear')) {
            hazards.push('Cloud');
        }
        if (html.includes('Lock the following row')) {
            hazards.push('Tape');
        }
        if (html.includes('hide all orbs on the board')) {
            hazards.push('Blind');
        }
        if (html.includes('7x6')) {
            hazards.push('7x6');
        }

        const BIG_DATA: FloorData = {
            num: +floorNum,
            hazards,
        };
        temp.floorData.push(BIG_DATA);
    });

    res.json(temp);
};
