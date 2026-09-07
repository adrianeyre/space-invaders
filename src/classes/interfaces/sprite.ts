import DirectionEnum from '../enums/direction-enum';
import PlayerResultEnum from '../enums/player-result-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISprite {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	xOffset: boolean;
	width: number;
	height: number;
	score: number;
	xStep: number;
	yStep: number;
	zIndex: number;
	direction: DirectionEnum | undefined;
	image: string;
	speed: number | undefined;
	type: SpriteTypeEnum;
	move(
		direction: DirectionEnum,
		playerX: number,
		playerY: number,
		playerHeight: number,
		playerWidth: number,
		visableSprites: ISprite[],
		containerHeight: number
	): PlayerResultEnum;
}
