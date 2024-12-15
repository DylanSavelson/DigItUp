import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
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
		this.explodeAnimation = new Animation([6,7,8,9,10,11], 0.1, 1);
		this.mined = false;
		this.dirNumber = null;
	}

	
	update(dt)
	{
		this.getHit();
		if (this.mined && this.currentFrame < 11)
		{
			this.currentAnimation?.update(dt);
			this.currentFrame = this.explodeAnimation.getCurrentFrame();
		}
	}

	getHit() {
        if(this.player.targetedStone === this && this.player.swinging === true && !this.mined)
		{
			this.currentFrame++;
			this.player.swinging = false;
			if(this.currentFrame === 5)
			{
				this.mined = true;
				this.currentAnimation = this.explodeAnimation;
				this.isCollidable = false;
				this.isSolid = false;
			}
		}
    }
    
	onCollision(collider) {
		super.onCollision(collider);
		this.checkTargetedStone(collider);
		
	}

	checkTargetedStone(collider) 
	{
		this.dirNumber = getCollisionDirection(collider.position.x, collider.position.y, collider.dimensions.x, collider.dimensions.y, this.position.x,this.position.y,
			Stone.WIDTH, Stone.HEIGHT);
		if(this.dirNumber === 1)
		{
			this.player.stoneBelow = this;
		}
		if (this.dirNumber === this.player.direction)
		{
			this.player.targetedStone = this;
		}

	}


}
