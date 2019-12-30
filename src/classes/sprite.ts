import ISpriteProps from './interfaces/sprite-props';
import ISprite from './interfaces/sprite';
import DirectionEnum from './enums/direction-enum';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import ImageEnum from './enums/image-enum';

import alien1a from '../images/alien1a.png';
import alien1b from '../images/alien1b.png';
import alien2a from '../images/alien2a.png';
import alien2b from '../images/alien2b.png';
import alien3a from '../images/alien3a.png';
import alien3b from '../images/alien3b.png';
import shield from '../images/shield.png';
import bullet from '../images/bullet.png';

export default class Sprite implements ISprite {
	public key: string;
	public visable: boolean;
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	public xStep: number;
	public yStep: number;
	public xOffset: boolean;
	public zIndex: number;
	public direction: DirectionEnum | undefined;
	public image: ImageEnum;
	public speed: number | undefined;
	public type: SpriteTypeEnum;

	private imageOn: boolean;
	private imageType: string;

	readonly X_OFFSET: boolean = false;
	readonly Z_INDEX: number = 5000;
	readonly X_STEP: number = 5;
	readonly Y_STEP: number = 5;
	readonly playerImages = {
		alien1: [alien1a, alien1b],
		alien2: [alien2a, alien2b],
		alien3: [alien3a, alien3b],
		shield: [shield, shield],
		bullet: [bullet, bullet],
	}

	constructor(config: ISpriteProps) {
		this.imageOn = true;
		this.imageType = config.image;
		this.key = config.key;
		this.visable = config.visable;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.xStep = this.X_STEP;
		this.yStep = this.Y_STEP;
		this.xOffset = config.xOffset ? config.xOffset : this.X_OFFSET;
		this.zIndex = this.Z_INDEX;
		this.direction = config.direction ? config.direction : undefined;
		this.image = this.playerImages[this.imageType][this.imageOn ? 0 : 1];
		this.type = config.type;
	}

	public move = (direction: DirectionEnum, playerX: number, playerY: number): PlayerResultEnum => {
		switch (direction) {
			case DirectionEnum.LEFT: this.x -= this.xStep; break;
			case DirectionEnum.RIGHT: this.x += this.xStep; break;
			case DirectionEnum.DOWN: this.y += this.yStep; break;
		}

		this.updateImage();

		return this.checkClash(playerX, playerY);
	}

	public checkClash = (playerX: number, playerY: number): PlayerResultEnum => {
		return PlayerResultEnum.NO_MOVE
	}

	private updateImage = () => {
		this.imageOn = !this.imageOn;
		this.image = this.playerImages[this.imageType][this.imageOn ? 0 : 1];
	}
}
