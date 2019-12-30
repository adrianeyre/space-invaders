import IGame from '../../../classes/interfaces/game';

export default interface ISpaceInvadersState {
	game: IGame;
	spriteWidth: number;
	spriteHeight: number;
	containerWidth: number
	containerHeight: number;
	timerAlien?: any;
	timerBullet?: any;
}
