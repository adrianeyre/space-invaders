import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import alien1 from '../images/alien1.png';
import alien2 from '../images/alien2.png';
import alien3 from '../images/alien3.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public xOffset: boolean;
	public zIndex: number;
	public direction: DirectionEnum | undefined;
	public image: ImageEnum;
	public speed: number | undefined;
	public type: SpriteTypeEnum;

	readonly X_OFFSET: boolean = false;
	readonly Z_INDEX: number = 5000;
	readonly playerImages = {
		alien1,
		alien2,
		alien3,
	}

	constructor(config: ISpriteProps) {
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.xOffset = config.xOffset ? config.xOffset : this.X_OFFSET;
		this.zIndex = this.Z_INDEX;
		this.direction = config.direction ? config.direction : undefined;
		this.image = this.playerImages[config.image];
		this.speed = config.speed;
		this.type = config.type;
	}

	public move = (playerX: number, playerY: number): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE;
	}

	public checkClash = (playerX: number, playerY: number): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE
	}
}
