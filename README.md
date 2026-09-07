# Space Invaders Game

#### Technologies: TypeScript, React 19, SCSS, Vite, Vitest

Space Invaders is a fixed shooter in which the player controls a laser cannon by moving it horizontally across the bottom of the screen and firing at descending aliens. The aim is to defeat five rows of eleven aliens—although some versions feature different numbers—that move horizontally back and forth across the screen as they advance toward the bottom of the screen. The player's laser cannon is partially protected by several stationary defense bunkers—the number also varies by version—that are gradually destroyed from the top and bottom by blasts from either the aliens or the player.

The player defeats an alien and earns points by shooting it with the laser cannon. As more aliens are defeated, the aliens' movement and the game's music both speed up. Defeating all the aliens on-screen brings another wave that is more difficult, a loop which can continue endlessly. A special "mystery ship" will occasionally move across the top of the screen and award bonus points if destroyed.

The aliens attempt to destroy the player's cannon by firing at it while they approach the bottom of the screen. If they reach the bottom, the alien invasion is declared successful and the game ends tragically; otherwise, it ends generally if the player's last cannon is destroyed by the enemy's projectiles.

## Index
* [Installation and Run](#Install)
* [Scripts](#Scripts)
* [Screen Shots](#Shots)
* [Play Space Invaders](#Play)

## <a name="Install">Installation and Run</a>

Node 26 or newer is required.

* To clone the repo and run the game
```shell
$ git clone https://github.com/adrianeyre/space-invaders
$ cd space-invaders
$ npm install
$ npm start
```

## <a name="Scripts">Scripts</a>

| Script | What it does |
| --- | --- |
| `npm start` | Run the Vite dev server |
| `npm run build` | Typecheck, then build the production site into `dist/` |
| `npm run preview` | Serve the built site locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint over the whole repository |
| `npm run format:check` | Verify Prettier formatting |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |

The site is built with a base path of `/space-invaders/` because GitHub Pages serves it
from a project page. To build for a different mount point, set `VITE_BASE`:

```shell
$ VITE_BASE=/ npm run build
```

## <a name="Shots">Screen Shots</a>
[![Screenshot](https://raw.githubusercontent.com/adrianeyre/space-invaders/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/space-invaders/master/src/images/screenshot1.png "Game View")

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/space-invaders/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/space-invaders/master/src/images/screenshot2.png "Game View")

## <a name="Play">Play Space Invaders</a>
* [Space Invaders on GitHub Pages](https://adrianeyre.github.io/space-invaders/)
* [Space Invaders](http://adrianeyre.co.uk/space-invaders)
