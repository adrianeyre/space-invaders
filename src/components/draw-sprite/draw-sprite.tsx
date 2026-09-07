import type { FC } from 'react';

import type IDrawSpriteProps from './interfaces/draw-sprite-props';

const DrawSprite: FC<IDrawSpriteProps> = (props: IDrawSpriteProps) => {
	const styleSprite = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${(x - 1) * props.width}px, ${(y - 1) * props.height}px, 0)`,
		transform: `translate3d(${(x - 1) * props.width}px, ${(y - 1) * props.height}px, 0)`,
		zIndex: props.sprite.zIndex,
	});

	if (!props.sprite.visable) return <div></div>;

	return (
		<div key={props.sprite.key} style={styleSprite(props.sprite.x, props.sprite.y)}>
			<img
				src={props.sprite.image}
				height={props.height * props.sprite.height}
				width={props.width * props.sprite.width}
				alt="sprite"
			/>
		</div>
	);
};

export default DrawSprite;
