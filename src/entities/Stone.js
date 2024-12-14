import { getRandomPositiveInteger } from '../../lib/Random.js';
import StateMachine from '../../lib/StateMachine.js';
import OreName from '../enums/OreName.js';
import SoundName from '../enums/SoundName.js';
import { sounds } from '../globals.js';
import MineShaft from '../objects/MineShaft.js';
import Tile from '../objects/Tile.js';
import GameEntity from './GameEntity.js';

export default class Stone extends GameEntity {
	static WIDTH = 16;
	static HEIGHT = 16;

	/**
	 * The base ore, can contain other ores or just a stone.
	 */
	constructor(sprites) {
		super();

		this.sprites = sprites;
		this.position.x = getRandomPositiveInteger(
			MineShaft.LEFT_EDGE,
			MineShaft.RIGHT_EDGE - Tile.TILE_SIZE
		);
		this.position.y = getRandomPositiveInteger(
			MineShaft.TOP_EDGE,
			MineShaft.BOTTOM_EDGE - Tile.TILE_SIZE
		);
		this.dimensions.x = Stone.WIDTH;
		this.dimensions.y = Stone.HEIGHT;
	}

	getHit(player, mineshaft) {
        //display hit
	}

	initializeStateMachine(animations) {
		const stateMachine = new StateMachine();


		return stateMachine;
	}
}
