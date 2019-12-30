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
	public score: number;
	public movable: boolean;
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
	readonly Y_STEP: number = 2;
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
		this.movable = config.movable ? config.movable : false;
		this.xOffset = config.xOffset ? config.xOffset : this.X_OFFSET;
		this.zIndex = this.Z_INDEX;
		this.score = config.score ? config.score : 0;
		this.direction = config.direction ? config.direction : undefined;
		this.image = this.playerImages[this.imageType][this.imageOn ? 0 : 1];
		this.type = config.type;
	}

	public move = (direction: DirectionEnum, playerX: number, playerY: number, playerHeight: number, playerWidth: number, visableSprites: ISprite[]): PlayerResultEnum => {
		if (!this.movable) return PlayerResultEnum.NO_MOVE;

		switch (direction) {
			case DirectionEnum.UP: this.y -= this.yStep; break;
			case DirectionEnum.DOWN: this.y += this.yStep; break;
			case DirectionEnum.LEFT: this.x -= this.xStep; break;
			case DirectionEnum.RIGHT: this.x += this.xStep; break;
		}

		if (this.y < 1) this.visable = false;

		this.updateImage();

		return this.checkClash(playerX, playerY, playerHeight, playerWidth, visableSprites);
	}

	private checkClash = (playerX: number, playerY: number, playerHeight: number, playerWidth: number, visableSprites: ISprite[]): PlayerResultEnum => {
		if (this.isClashed('', playerX, playerY, playerHeight, playerWidth)) return PlayerResultEnum.DEAD;

		const overlappingSprites = visableSprites.filter((sprite: ISprite) => this.isClashed(sprite.key, sprite.x, sprite.y, sprite.height, sprite.width));

		if (overlappingSprites.length > 0) {
			overlappingSprites[0].visable = false;
			if (this.type === SpriteTypeEnum.BULLET) this.visable = false;

			switch (overlappingSprites[0].type) {
				case SpriteTypeEnum.ALIEN1: return PlayerResultEnum.ALIEN1_POINTS;
				case SpriteTypeEnum.ALIEN2: return PlayerResultEnum.ALIEN2_POINTS;
				case SpriteTypeEnum.ALIEN3: return PlayerResultEnum.ALIEN3_POINTS;
				case SpriteTypeEnum.ALIEN4: return PlayerResultEnum.ALIEN4_POINTS;
			}
		}

		return PlayerResultEnum.NO_MOVE
	}

	private isClashed = (key: string, x: number, y: number, height: number, width: number) =>
	(
		this.key !== key &&
		this.x + this.width > x &&
		this.x < x && 
		this.y + this.height > y &&
		this.y < y
	)
	||
	(
		this.key !== key &&
		this.x >= x &&
		this.x < x + width &&
		this.y >= y &&
		this.y < y + height
	)

	private updateImage = () => {
		this.imageOn = !this.imageOn;
		this.image = this.playerImages[this.imageType][this.imageOn ? 0 : 1];
	}
}
