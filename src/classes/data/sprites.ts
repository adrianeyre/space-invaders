import DirectionEnum from '../enums/direction-enum';
import ImageEnum from '../enums/image-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';
import ISpriteProps from '../interfaces/sprite-props';

const sprites: ISpriteProps[] = [
	{
		key: 'alien1-1',
		visable: true,
		x: 1,
		y: 1,
		direction: DirectionEnum.LEFT,
		image: ImageEnum.ALIEN1,
		speed: 50,
		type: SpriteTypeEnum.ALIEN1,
	},
	{
		key: 'alien2-1',
		visable: true,
		x: 2,
		y: 2,
		direction: DirectionEnum.LEFT,
		image: ImageEnum.ALIEN2,
		speed: 50,
		type: SpriteTypeEnum.ALIEN2,
	},
	{
		key: 'alien3-1',
		visable: true,
		x: 3,
		y: 3,
		direction: DirectionEnum.LEFT,
		image: ImageEnum.ALIEN3,
		speed: 50,
		type: SpriteTypeEnum.ALIEN3,
	},
]

export default sprites
