import { getRandomPositiveInteger } from '../../lib/Random.js';
import StateMachine from '../../lib/StateMachine.js';
import OreName from '../enums/OreName.js';
import SoundName from '../enums/SoundName.js';
import { context, sounds } from '../globals.js';
import MineShaft from './MineShaft.js';
import Tile from './Tile.js';
import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import Direction from '../enums/Direction.js';
import PlayerPickaxeSwingingState from '../states/player/PlayerPickaxeSwingingState.js';
import { getCollisionDirection } from '../../lib/Collision.js';

export default class Stone extends GameObject {
	static WIDTH = 32;
	static HEIGHT = 32;
	static dimensions = new Vector(this.WIDTH,this.HEIGHT)
	/**
	 * The base ore, can contain other ores or just a stone.
	 */
	constructor(sprites, position, player) {
		super(Stone.dimensions, position);
		this.sprites = sprites;
        this.isCollidable = true;
		this.isSolid = true;
		this.currentFrame = 0;
		this.player = player;
	}

	
	update(dt)
	{
		this.getHit()
	}

	getHit(mineshaft) {
        if(this.player.targetedStone === this && this.player.swinging === true)
		{
			this.currentFrame++;
			this.player.swinging = false;
		}
    }
    
	onCollision(collider) {
		super.onCollision(collider);
		this.checkTargetedStone(collider);
	}

	checkTargetedStone(collider) 
	{
		const dirNumber = getCollisionDirection(collider.position.x, collider.position.y, collider.dimensions.x, collider.dimensions.y, this.position.x,this.position.y,
			Stone.WIDTH, Stone.HEIGHT)
		if (dirNumber == this.player.direction)
		{
			this.player.targetedStone = this;
		}
	}

}
