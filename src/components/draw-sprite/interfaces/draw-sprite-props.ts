import type IPlayer from '../../../classes/interfaces/player';
import type ISprite from '../../../classes/interfaces/sprite';

export default interface IDrawSpriteProps {
	sprite: IPlayer | ISprite;
	height: number;
	width: number;
	containerWidth: number;
}
