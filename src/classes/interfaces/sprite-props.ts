import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';

export default interface ISpriteProps {
	key: string;
	visable: boolean;
	x: number;
	y: number;
	width: number;
	height: number;
	xOffset?: boolean;
	direction?: DirectionEnum;
	image: string;
	type: SpriteTypeEnum;
}
