import { maxBy, minBy, remove } from 'lodash';

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
	public alienTimerInterval: number;
	public bulletTimerInterval: number;

	readonly DEFAULT_ALIEN_TIMER_INTERVAL: number = 1000;
	readonly DEFAULT_BULLET_TIMER_INTERVAL: number = 20;
	readonly DEFAULT_ALIEN_TIMER_DECREMENT: number = 50;
	readonly SPRITE_BLOCKS_WIDTH: number = 143;
	readonly SPRITE_BLOCKS_HEIGHT: number = 96;
	readonly SCORE_NEXT_LEVEL: number = 100;
	readonly SCORE_ALIEN1: number = 40;
	readonly SCORE_ALIEN2: number = 30;
	readonly SCORE_ALIEN3: number = 20;
	readonly SCORE_ALIEN4: number = 10;

	constructor(config: ISpaceInvadersProps) {
		this.player = new Player(config);
		this.sprites = this.resetSprites();
		this.level = 1;
		this.direction = DirectionEnum.RIGHT
		this.isGameInPlay = false;
		this.iteration = 1;
		this.alienTimerInterval = this.DEFAULT_ALIEN_TIMER_INTERVAL;
		this.bulletTimerInterval = this.DEFAULT_BULLET_TIMER_INTERVAL;
	}

	public handleInput = (playerResult: PlayerResultEnum, sprite?: ISprite): void => {
		switch (playerResult) {
			case PlayerResultEnum.NO_MOVE:
				return;
			case PlayerResultEnum.PLAYER_DEAD:
				this.looseLife(); break;
			case PlayerResultEnum.SPRITE_DEAD:
				this.killSprite(sprite ? sprite : undefined); break;
			case PlayerResultEnum.ALIEN1_POINTS:
				this.player.addScore(this.SCORE_ALIEN1); break;
			case PlayerResultEnum.ALIEN2_POINTS:
				this.player.addScore(this.SCORE_ALIEN2); break;
			case PlayerResultEnum.ALIEN3_POINTS:
				this.player.addScore(this.SCORE_ALIEN3); break;
			case PlayerResultEnum.ALIEN4_POINTS:
				this.player.addScore(this.SCORE_ALIEN4); break;
			case PlayerResultEnum.ARROW_RIGHT:
				this.movePlayer(DirectionEnum.RIGHT); break;
			case PlayerResultEnum.ARROW_LEFT:
				this.movePlayer(DirectionEnum.LEFT); break;
			case PlayerResultEnum.ENTER:
			case PlayerResultEnum.SPACE_BAR:
				this.fire(); break;
		}
	}

	public handleTimer = (): void => {
		const aliveAliens = this.aliveAliens();

		if (aliveAliens.length < 1) {
			this.nextLevel();
		}

		const visableSprites = this.visableSprites();
		const furthestRightAlien = maxBy(aliveAliens, (alien: ISprite) => alien.x);
		const furthestLeftAlien = minBy(aliveAliens, (alien: ISprite) => alien.x);
		let nextDirection = this.direction;

		if (furthestRightAlien && this.direction === DirectionEnum.RIGHT && furthestRightAlien.x + furthestRightAlien.width > this.SPRITE_BLOCKS_WIDTH) {
			this.alienTimerInterval -= this.DEFAULT_ALIEN_TIMER_DECREMENT;
			this.direction = DirectionEnum.DOWN;
			nextDirection = DirectionEnum.LEFT
		}

		if (furthestLeftAlien && this.direction === DirectionEnum.LEFT && furthestLeftAlien.x + furthestLeftAlien.width < furthestLeftAlien.width) {
			this.alienTimerInterval -= this.DEFAULT_ALIEN_TIMER_DECREMENT;
			this.direction = DirectionEnum.DOWN;
			nextDirection = DirectionEnum.RIGHT
		}

		aliveAliens.forEach((sprite: ISprite) => this.moveSprite(sprite, this.direction, visableSprites));

		if (Math.floor(Math.random() * 100) > 60) {
			const lowerAliens: ISprite[] = [];
			aliveAliens.forEach((alien: ISprite) => {
				if (aliveAliens.filter((findAlien: ISprite) => alien.key !== findAlien.key && findAlien.y > alien.y && findAlien.x === alien.x).length === 0) {
					lowerAliens.push(alien);
				}
			})

			this.alienFire(lowerAliens[Math.floor(Math.random() * lowerAliens.length)]);
		}

		this.direction = nextDirection;
	}

	public handleBullet = () => {
		const playerBullet = this.getPlayerBullet();
		const alienBullet = this.getAlienBullet();
		const visableSprites = this.visableSprites();

		if (playerBullet && playerBullet.visable) {
			this.moveSprite(playerBullet, DirectionEnum.UP, visableSprites)
		}

		if (alienBullet.length > 0) {
			alienBullet.map((bullet: ISprite) => this.moveSprite(bullet, DirectionEnum.DOWN, visableSprites));
		}
	}

	private movePlayer = (direction: DirectionEnum): void => {
		const result = this.player.move(direction, this.SPRITE_BLOCKS_WIDTH);

		this.handleInput(result);
	}

	private moveSprite = (sprite: ISprite, direction: DirectionEnum, visableSprites: ISprite[]): void => {
		const result = sprite.move(direction, this.player.x, this.player.y, this.player.height, this.player.width, visableSprites, this.SPRITE_BLOCKS_HEIGHT);

		this.handleInput(result, sprite);
	}

	private fire = (): void => {
		const bullet = this.getPlayerBullet();

		if (!bullet || bullet.visable) return;

		bullet.visable = true;
		bullet.x = this.player.x + this.player.width / 2;
		bullet.y = this.player.y - 2;
	}

	private alienFire = (alien: ISprite): void => {
		const alienBullet = this.sprites.find((sprite : ISprite) => sprite.key === `alient-bullet-${ alien.key }`);
		if (alienBullet) return;

		this.sprites.push( new Sprite({
			key: `alient-bullet-${ alien.key }`,
			visable: true,
			movable: true,
			x: alien.x,
			y: alien.y + alien.height,
			width: 1,
			height: 2,
			image: ImageEnum.ALIEN_BULLET,
			type: SpriteTypeEnum.ALIEN_BULLET,
		}))
	}

	private nextLevel = (): void => {
		this.level ++;
		this.resetTimers();
		this.player.addScore(this.SCORE_NEXT_LEVEL);
		this.sprites = this.resetSprites();
	}

	private looseLife = (): void => {
		const bullet = this.getPlayerBullet();
		if (bullet) bullet.visable = false;

		this.resetTimers();
		this.isGameInPlay = this.player.looseLife();
		this.player.resetPlayerToStart();
		this.sprites = this.resetSprites();
	}

	private killSprite = (sprite?: ISprite) => {
		if (!sprite) return;

		remove(this.sprites, { key: sprite.key });
	}

	private visableSprites = (): ISprite[] => this.sprites.filter((sprite: ISprite) => sprite.visable);
	private getPlayerBullet = (): ISprite | undefined => this.sprites.find((sprite: ISprite) => sprite.type === SpriteTypeEnum.PLAYER_BULLET);
	private getAlienBullet = (): ISprite[] => this.sprites.filter((sprite: ISprite) => sprite.type === SpriteTypeEnum.ALIEN_BULLET);
	private resetSprites = (): ISprite[] => this.sprites = spritesData.default.map((sprite: ISpriteProps) => new Sprite(sprite));

	private aliveAliens = (): ISprite[] => this.sprites.filter((sprite: ISprite) =>
		sprite.visable && (
			sprite.type === SpriteTypeEnum.ALIEN1 ||
			sprite.type === SpriteTypeEnum.ALIEN2 ||
			sprite.type === SpriteTypeEnum.ALIEN3 ||
			sprite.type === SpriteTypeEnum.ALIEN4
		)
	);

	private resetTimers = (): void => {
		this.alienTimerInterval = this.DEFAULT_ALIEN_TIMER_INTERVAL;
		this.bulletTimerInterval = this.DEFAULT_BULLET_TIMER_INTERVAL;
	}
}
