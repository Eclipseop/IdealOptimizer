export default (id: string) => {
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
