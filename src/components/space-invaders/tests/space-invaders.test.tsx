import React from 'react';
import { shallow } from 'enzyme';

import SpaceInvaders from '../space-invaders';
import ISpaceInvadersProps from '../interfaces/space-invaders-props';

describe('Space Invaders', () => {
	it('Should render correctly', () => {
		const defaultProps: ISpaceInvadersProps = {};
		const game = shallow(<SpaceInvaders {...defaultProps} />);
		expect(game).toMatchSnapshot();
	});
});