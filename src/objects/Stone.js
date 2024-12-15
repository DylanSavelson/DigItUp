import { getRandomPositiveInteger } from '../../lib/Random.js';
import StateMachine from '../../lib/StateMachine.js';
import OreName from '../enums/OreName.js';
import SoundName from '../enums/SoundName.js';
import { context, sounds } from '../globals.js';
import MineShaft from './MineShaft.js';
import Tile from './Tile.js';
import Animation from '../../lib/Animation.js';
import OreStateName from '../enums/OreStateName.js';
import OreIdlingState from '../states/ore/OreIdlingState.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';

export default class Stone extends GameObject {
	static WIDTH = 32;
	static HEIGHT = 32;
	static dimensions = new Vector(this.WIDTH,this.HEIGHT)
	/**
	 * The base ore, can contain other ores  or just a stone.
	 */
	constructor(sprites, position) {
		super(Stone.dimensions, position);
		this.sprites = sprites;
        this.isCollidable = true;
		this.isSolid = true;
		this.currentFrame = 0;
	}

	update(dt)
	{

	}
	getHit(player, mineshaft) {
        //display hit
    }
    
	onCollision(collider) {
		super.onCollision(collider);
	}

}
