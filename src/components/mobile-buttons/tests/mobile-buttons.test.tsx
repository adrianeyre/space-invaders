import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import PlayerResultEnum from '../../../classes/enums/player-result-enum';
import type IMobileButtonsProps from '../interfaces/mobile-buttons-props';
import MobileButtons from '../mobile-buttons';

describe('Mobile Buttons', () => {
	it('Should render correctly', () => {
		const defaultProps: IMobileButtonsProps = {
			handleMobileButton: vi.fn(),
		};

		const { container } = render(<MobileButtons {...defaultProps} />);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('Should report the direction of the button that was pressed', async () => {
		const handleMobileButton = vi.fn();
		render(<MobileButtons handleMobileButton={handleMobileButton} />);

		await userEvent.click(screen.getByRole('button', { name: 'LEFT' }));
		await userEvent.click(screen.getByRole('button', { name: 'RIGHT' }));
		await userEvent.click(screen.getByRole('button', { name: 'FIRE!' }));

		expect(handleMobileButton.mock.calls).toEqual([
			[PlayerResultEnum.ARROW_LEFT],
			[PlayerResultEnum.ARROW_RIGHT],
			[PlayerResultEnum.SPACE_BAR],
		]);
	});
});
