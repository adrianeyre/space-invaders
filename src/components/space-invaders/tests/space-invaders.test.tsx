import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type ISpaceInvadersProps from '../interfaces/space-invaders-props';
import SpaceInvaders from '../space-invaders';

describe('Space Invaders', () => {
	const defaultProps: ISpaceInvadersProps = {};

	it('Should render correctly', () => {
		const { container } = render(<SpaceInvaders {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should open on the info board rather than a game in play', () => {
		render(<SpaceInvaders {...defaultProps} />);

		expect(screen.getByRole('button', { name: 'Play Game' })).toBeInTheDocument();
		expect(screen.queryAllByAltText('sprite')).toHaveLength(0);
	});

	it('Should put sprites on screen once the game starts', async () => {
		render(<SpaceInvaders {...defaultProps} />);

		await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

		expect(screen.queryByRole('button', { name: 'Play Game' })).not.toBeInTheDocument();
		expect(screen.getAllByAltText('sprite').length).toBeGreaterThan(0);
	});
});
