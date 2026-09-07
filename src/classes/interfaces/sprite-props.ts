import DirectionEnum from '../enums/direction-enum';
import ImageEnum from '../enums/image-enum';
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
	score?: number;
	movable?: boolean;
	image: ImageEnum;
	type: SpriteTypeEnum;
}
