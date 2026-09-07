import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InfoBoard from '../info-board';
import type IInfoBoardProps from '../interfaces/info-board-props';

describe('Info Board', () => {
	const defaultProps: IInfoBoardProps = {
		gameOver: true,
		score: 1000,
		containerHeight: 1,
		startGame: vi.fn(),
	};

	it('Should render correctly', () => {
		const { container } = render(<InfoBoard {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should show the final score when the game is over', () => {
		render(<InfoBoard {...defaultProps} />);

		expect(screen.getByText('Game Over')).toBeInTheDocument();
		expect(screen.getByText(/You scored 1000/)).toBeInTheDocument();
	});

	it('Should hide the game over panel before the first game', () => {
		render(<InfoBoard {...defaultProps} gameOver={false} />);

		expect(screen.queryByText('Game Over')).not.toBeInTheDocument();
	});

	it('Should start a game when the button is pressed', async () => {
		const startGame = vi.fn();
		render(<InfoBoard {...defaultProps} startGame={startGame} />);

		await userEvent.click(screen.getByRole('button', { name: 'Play Game' }));

		expect(startGame).toHaveBeenCalledTimes(1);
	});
});
