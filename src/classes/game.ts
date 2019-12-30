import { maxBy, minBy } from 'lodash';

import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import ISpriteProps from './interfaces/sprite-props';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectionEnum from './enums/direction-enum';
import ImageEnum from './enums/image-enum';
import ISpaceInvadersProps from '../components/space-invaders/interfaces/space-invaders-props';

import * as spritesData from './data/sprites'
import Sprite from './sprite';

export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public level: number;
	public direction: DirectionEnum;
	public timer: any;
	public iteration: number;
	public isGameInPlay: boolean;

	private SPRITE_BLOCKS_WIDTH: number = 143;
	// private SPRITE_BLOCKS_HEIGHT: number = 96;

	constructor(config: ISpaceInvadersProps) {
		this.player = new Player(config);
		this.sprites = spritesData.default.map((sprite: ISpriteProps) => new Sprite(sprite));
		this.level = 1;
		this.direction = DirectionEnum.RIGHT
		this.isGameInPlay = false;
		this.iteration = 1;
	}

	public handleInput = (playerResult: PlayerResultEnum): void => {
		switch (playerResult) {
			case PlayerResultEnum.NO_MOVE:
				return;
			case PlayerResultEnum.ARROW_RIGHT:
				this.move(DirectionEnum.RIGHT); break;
			case PlayerResultEnum.ARROW_LEFT:
				this.move(DirectionEnum.LEFT); break;
			case PlayerResultEnum.ENTER:
			case PlayerResultEnum.SPACE_BAR:
				this.fire(); break;
		}
	}

	public handleTimer = (): void => {
		const aliveAliens = this.sprites.filter((sprite: ISprite) => sprite.visable && sprite.type === SpriteTypeEnum.ALIEN);
		const furthestRightAlien = maxBy(aliveAliens, (alien: ISprite) => alien.x);
		const furthestLeftAlien = minBy(aliveAliens, (alien: ISprite) => alien.x);
		let nextDirection = this.direction;

		if (furthestRightAlien && this.direction === DirectionEnum.RIGHT && furthestRightAlien.x + furthestRightAlien.width > this.SPRITE_BLOCKS_WIDTH) {
			this.direction = DirectionEnum.DOWN;
			nextDirection = DirectionEnum.LEFT
		}

		if (furthestLeftAlien && this.direction === DirectionEnum.LEFT && furthestLeftAlien.x + furthestLeftAlien.width < furthestLeftAlien.width) {
			this.direction = DirectionEnum.DOWN;
			nextDirection = DirectionEnum.RIGHT
		}

		aliveAliens.forEach((sprite: ISprite) => sprite.move(this.direction, this.player.x, this.player.y));
		this.direction = nextDirection;
	}

	public handleBullet = () => {

	}

	private move = (direction: DirectionEnum): void => {
		const result = this.player.move(direction, this.SPRITE_BLOCKS_WIDTH);

		this.handleInput(result);
	}

	private fire = () => {
		const bullet = this.sprites.filter(( sprite: ISprite) => sprite.key === 'bullet');

		if (bullet.length > 0) return;

		this.sprites.push(new Sprite({
			key: 'bullet',
			visable: true,
			x: this.player.x + this.player.width / 2,
			y: this.player.y - 2,
			width: 1,
			height: 2,
			image: ImageEnum.BULLET,
			type: SpriteTypeEnum.BULLET,
		}))
	}
}
