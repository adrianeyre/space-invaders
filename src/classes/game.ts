import { maxBy, minBy } from 'lodash';

import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import ISpriteProps from './interfaces/sprite-props';
import PlayerResultEnum from './enums/player-result-enum';
import SpriteTypeEnum from './enums/sprite-type-enum';
import DirectionEnum from './enums/direction-enum';
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
		}
	}

	public handleTimer = (spriteBlocksWidth: number, spriteBlocksHeight: number): void => {
		const aliveAliens = this.sprites.filter((sprite: ISprite) => sprite.visable && sprite.type === SpriteTypeEnum.ALIEN);
		const furthestRightAlien = maxBy(aliveAliens, (alien: ISprite) => alien.x);
		const furthestLeftAlien = minBy(aliveAliens, (alien: ISprite) => alien.x);
		let nextDirection = this.direction;

		if (furthestRightAlien && this.direction === DirectionEnum.RIGHT && furthestRightAlien.x + furthestRightAlien.width > spriteBlocksWidth) {
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
}
