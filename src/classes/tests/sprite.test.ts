import DirectionEnum from '../enums/direction-enum';
import SpriteTypeEnum from '../enums/sprite-type-enum';
import PlayerResultEnum from '../enums/player-result-enum';

import Sprite from '../sprite';
import ISpriteProps from '../interfaces/sprite-props';

describe('Sprite', () => {
	let defaultConfig: ISpriteProps

	beforeEach(() => {
		defaultConfig = {
			key: 'sprite',
			visable: true,
			x: 10,
			y: 10,
			xOffset: false,
			direction: DirectionEnum.RIGHT,
			image: 'alien1',
			speed: 10,
			type: SpriteTypeEnum.ALIEN1,
		}
	})

	it('Should create Sprite class', () => {
		const sprite = new Sprite(defaultConfig);

		expect(sprite.key).toEqual('sprite');
		expect(sprite.visable).toEqual(true);
		expect(sprite.x).toEqual(10);
		expect(sprite.y).toEqual(10);
		expect(sprite.xOffset).toEqual(false);
		expect(sprite.zIndex).toEqual(5000);
		expect(sprite.direction).toEqual(DirectionEnum.RIGHT);
		expect(sprite.image).toEqual('alien1.png');
		expect(sprite.speed).toEqual(10);
		expect(sprite.type).toEqual(SpriteTypeEnum.ALIEN1);
	});

	it('Should move sprite and not clash with player', () => {
		const sprite = new Sprite(defaultConfig);
		const result = sprite.move(1, 1);

		expect(result).toEqual(PlayerResultEnum.NO_MOVE);
	});
});