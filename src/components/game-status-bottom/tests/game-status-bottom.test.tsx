import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import GameStatusBottom from '../game-status-bottom';
import type IGameStatusBottomProps from '../interfaces/game-status-bottom-props';

describe('Game Status Bottom', () => {
	it('Should render correctly', () => {
		const defaultProps: IGameStatusBottomProps = {
			lives: 3,
			level: 1,
		};

		const { container } = render(<GameStatusBottom {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should draw one life icon per remaining life', () => {
		render(<GameStatusBottom lives={3} level={7} />);

		expect(screen.getAllByAltText('lives')).toHaveLength(3);
		expect(screen.getByText('7')).toBeInTheDocument();
	});

	it('Should draw no life icons when no lives remain', () => {
		render(<GameStatusBottom lives={0} level={1} />);

		expect(screen.queryAllByAltText('lives')).toHaveLength(0);
	});
});
