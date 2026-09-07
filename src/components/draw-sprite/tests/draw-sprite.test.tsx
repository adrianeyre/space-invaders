import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Player from '../../../classes/player';
import DrawSprite from '../draw-sprite';
import type IDrawSpriteProps from '../interfaces/draw-sprite-props';

describe('Draw Sprite', () => {
	const defaultProps: IDrawSpriteProps = {
		sprite: new Player({}),
		height: 10,
		width: 10,
		containerWidth: 100,
	};

	it('Should render correctly', () => {
		const { container } = render(<DrawSprite {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should size the sprite image from its block dimensions', () => {
		render(<DrawSprite {...defaultProps} />);

		const image = screen.getByAltText('sprite');

		expect(image).toHaveAttribute('width', '100');
		expect(image).toHaveAttribute('height', '40');
	});

	it('Should draw nothing for an invisible sprite', () => {
		const hidden = new Player({});
		hidden.visable = false;

		render(<DrawSprite {...defaultProps} sprite={hidden} />);

		expect(screen.queryByAltText('sprite')).not.toBeInTheDocument();
	});
});
