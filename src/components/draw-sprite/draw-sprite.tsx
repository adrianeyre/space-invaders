import React, { FC, useEffect } from 'react';

import IDrawSpriteProps from './interfaces/draw-sprite-props';

const DrawSprite: FC<IDrawSpriteProps> = (props: IDrawSpriteProps) => {
	let offsetHeight = 0;
	let offsetWidth  = 0;

	const styleSprite = (x: number, y: number) => ({
		width: 0,
		height: 0,
		opacity: 1,
		WebkitTransform: `translate3d(${ (x - 1) * props.width + offsetWidth }px, ${ offsetHeight + (y - 1) * props.height }px, 0)`,
		transform: `translate3d(${ (x - 1) * props.width + offsetWidth }px, ${ offsetHeight + (y - 1) * props.height }px, 0)`,
		zIndex: props.sprite.zIndex,
	})

	const updateOffSets = () => {
		offsetHeight = ((props.containerWidth / 100) * 9);
		offsetWidth = props.sprite.xOffset ? -props.width / 2 : 0;
	}

	useEffect(() => {
        const runUpdateOffSets = async (): Promise<void> => {
            updateOffSets();
        }

        runUpdateOffSets();
    }, []);

	if (!props.sprite.visable) return <div></div>

	return <div key={ props.sprite.key } style={ styleSprite(props.sprite.x, props.sprite.y) }>
		<img
			src={ props.sprite.image }
			height={ props.height * props.sprite.height }
			width={ props.width * props.sprite.width }
			alt="sprite"
		/>
	</div>
}

export default DrawSprite;
