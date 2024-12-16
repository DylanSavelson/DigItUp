import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Sprite from '../../lib/Sprite.js';
import { images, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js';
import Easing from '../../lib/Easing.js';

export default class Stone extends GameObject {
	static WIDTH = 32;
	static HEIGHT = 32;
	static OREWIDTH = 16;
	static OREHEIGHT = 16;
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
		this.oreSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Ores),
			Stone.OREWIDTH,
			Stone.OREHEIGHT
		);
		this.hovering = false;
		this.positionChanged = true;

	}

	
	update(dt)
	{
		this.getHit(dt);

	}

	getHit(dt) {
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
		if (this.mined)
		{
			if (this.positionChanged)
			{
				this.position.x += 8;
				this.position.y += 11;
				this.positionChanged = false;
			}
			if(!this.hovering)
			{
				this.hovering = true;
				this.hoverOre();
			}
			if(this.currentFrame < 11)
			{
				this.currentAnimation?.update(dt);
				this.currentFrame = this.explodeAnimation.getCurrentFrame();
			}
		}
    }
    
	onCollision(collider) {
		super.onCollision(collider);
		this.checkTargetedStone(collider);
		
	}
	
    async hoverOre()
    {
        const movement = 5;
        await timer.tweenAsync(
			this.position,
			{  y: this.position.y + movement },
			1.2,
            Easing.easeInOutQuad
		);
        await timer.tweenAsync(
			this.position,
			{  y: this.position.y - movement },
			1.2,
            Easing.easeInOutQuad
		);
        this.hovering = false;
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
