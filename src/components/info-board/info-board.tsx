import React from 'react';

import IInfoBoardProps from './interfaces/info-board-props';

import player from '../../images/player.png';

import './styles/info-board.scss';

export default class InfoBoard extends React.Component<IInfoBoardProps, {}> {
	public render() {
		return <div className="info-board" style={ this.styleInfoBoard() }>
			<div className="info-board-header">
				<img src={ player } alt="player" />
				<span className="header-text">Space Invaders</span>
				<img src={player } alt="player" />
			</div>

			{ this.props.gameOver && <div className="game-over-area">
				<div className="game-over-title">Game Over</div>
				<div className="game-over-text">You scored { this.props.score }, better luck next time!</div>
			</div> }

			<div className="info-board-instructions">
				<p>Space Invaders is a fixed shooter in which the player controls a laser cannon by moving it horizontally across the bottom of the screen and firing at descending aliens. The aim is to defeat five rows of eleven aliens—although some versions feature different numbers—that move horizontally back and forth across the screen as they advance toward the bottom of the screen. The player's laser cannon is partially protected by several stationary defense bunkers—the number also varies by version—that are gradually destroyed from the top and bottom by blasts from either the aliens or the player.</p>
				<p>The player defeats an alien and earns points by shooting it with the laser cannon. As more aliens are defeated, the aliens' movement and the game's music both speed up. Defeating all the aliens on-screen brings another wave that is more difficult, a loop which can continue endlessly. A special "mystery ship" will occasionally move across the top of the screen and award bonus points if destroyed.</p>
				<p>The aliens attempt to destroy the player's cannon by firing at it while they approach the bottom of the screen. If they reach the bottom, the alien invasion is declared successful and the game ends tragically; otherwise, it ends generally if the player's last cannon is destroyed by the enemy's projectiles</p>
			</div>

			<div className="button-area">
				<button type="button" onClick={ this.props.startGame }>Play Game</button>
			</div>
		</div>
	}

	private styleInfoBoard = () => ({
		width: `100%`,
		maxWidth: `${ this.props.containerHeight }px`,
	})
}
