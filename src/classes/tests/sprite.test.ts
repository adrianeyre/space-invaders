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
			width: 8,
			height: 8,
			xOffset: false,
			direction: DirectionEnum.RIGHT,
			image: 'alien1',
			type: SpriteTypeEnum.ALIEN,
		}
	})

	it('Should create Sprite class', () => {
		const sprite = new Sprite(defaultConfig);

		expect(sprite.key).toEqual('sprite');
		expect(sprite.visable).toEqual(true);
		expect(sprite.x).toEqual(10);
		expect(sprite.y).toEqual(10);
		expect(sprite.width).toEqual(8);
		expect(sprite.height).toEqual(8);
		expect(sprite.xStep).toEqual(5);
		expect(sprite.yStep).toEqual(5);
		expect(sprite.xOffset).toEqual(false);
		expect(sprite.zIndex).toEqual(5000);
		expect(sprite.direction).toEqual(DirectionEnum.RIGHT);
		expect(sprite.image).toEqual('alien1a.png');
		expect(sprite.type).toEqual(SpriteTypeEnum.ALIEN);
	});

	it('Should move sprite and not clash with player', () => {
		const sprite = new Sprite(defaultConfig);
		const result = sprite.move(0, 1, 1);

		expect(result).toEqual(PlayerResultEnum.NO_MOVE);
	});
});