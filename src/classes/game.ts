import IGame from './interfaces/game';
import Player from './player';
import IPlayer from './interfaces/player';
import ISprite from './interfaces/sprite';
import ISpriteProps from './interfaces/sprite-props';
import PlayerResultEnum from './enums/player-result-enum';
import ISpaceInvadersProps from '../components/space-invaders/interfaces/space-invaders-props';

import * as spritesData from './data/sprites'
import Sprite from './sprite';

export default class Game implements IGame {
	public player: IPlayer;
	public sprites: ISprite[];
	public level: number;
	public timer: any;
	public iteration: number;
	public isGameInPlay: boolean;

	constructor(config: ISpaceInvadersProps) {
		this.player = new Player(config);
		this.sprites = spritesData.default.map((sprite: ISpriteProps) => new Sprite(sprite));
		this.level = 1;
		this.isGameInPlay = false;
		this.iteration = 1;
	}

	public handleInput = (playerResult: PlayerResultEnum): void => {
		switch (playerResult) {
			case PlayerResultEnum.NO_MOVE:
				return;
		}
	}

	public handleTimer = (): void => {
		
	}
}
