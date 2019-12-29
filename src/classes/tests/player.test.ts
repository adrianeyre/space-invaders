import DirectionEnum from '../enums/direction-enum';

import Player from '../player';

describe('Player', () => {
	it('Should create Player class', () => {
		const player = new Player({});

		expect(player.key).toEqual('player');
		expect(player.visable).toEqual(true);
		expect(player.x).toEqual(7);
		expect(player.y).toEqual(13);
		expect(player.initialPlayerX).toEqual(7);
		expect(player.initialPlayerY).toEqual(13);
		expect(player.xOffset).toEqual(false);
		expect(player.zIndex).toEqual(6000);
		expect(player.direction).toEqual(DirectionEnum.UP);
		expect(player.score).toEqual(0);
		expect(player.lives).toEqual(5);
		expect(player.image).toEqual('player.png');
		expect(player.isAlive).toEqual(true);
	});

	it('Should move player right one space', () => {
		const player = new Player({});
		player.move(DirectionEnum.RIGHT);

		expect(player.x).toEqual(7);
	});

	it('Should move player left one space', () => {
		const player = new Player({});
		player.move(DirectionEnum.LEFT);

		expect(player.x).toEqual(7);
	});

	it('Should reset player', () => {
		const player = new Player({});
		player.x = 1;
		player.y = 1;
		player.resetPlayerToStart();

		expect(player.x).toEqual(7);
		expect(player.y).toEqual(13);
	});

	it('Should loose a life', () => {
		const player = new Player({});

		expect(player.lives).toEqual(5);
		expect(player.looseLife()).toEqual(true);
		expect(player.lives).toEqual(4);
		expect(player.looseLife()).toEqual(true);
		expect(player.lives).toEqual(3);
		expect(player.looseLife()).toEqual(true);
		expect(player.lives).toEqual(2);
		expect(player.looseLife()).toEqual(true);
		expect(player.lives).toEqual(1);
		expect(player.looseLife()).toEqual(false);
		expect(player.lives).toEqual(0);
		expect(player.looseLife()).toEqual(false);
	});
});