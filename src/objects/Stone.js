import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Sprite from '../../lib/Sprite.js';
import { images, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js';
import Easing from '../../lib/Easing.js';
import Hitbox from '../../lib/Hitbox.js';

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
		this.mined = false;
		this.dirNumber = null;
		this.oreSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Ores),
			Stone.OREWIDTH,
			Stone.OREHEIGHT
		);
		this.hovering = false;
		this.positionChanged = true;
		this.shouldCallSetPositionsAfterMined = true;
	}

	
	update(dt)
	{
		this.getHit(dt);
		if (this.shouldCallSetPositionsAfterMined) 
		{
			this.setPositionsAfterMined(0);
		}
	}

	getHit(dt) {
        if(this.player.targetedStone === this && this.player.swinging === true && !this.mined)
		{
			this.currentFrame++;
			this.player.swinging = false;
			if(this.currentFrame === 5)
			{
				this.mined = true;
				this.isCollidable = false;
				this.isSolid = false;
				this.delayPickup()
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
		}
    }

	setPositionsAfterMined(frame)
    {
        if (this.mined)
            {
                this.sprites = this.oreSprites
                this.currentFrame = frame;
                this.dimensions = new Vector(Stone.OREHEIGHT, Stone.OREWIDTH);
                this.hitbox = new Hitbox(
                    this.position.x + this.hitboxOffsets.position.x,
                    this.position.y + this.hitboxOffsets.position.y,
                    this.dimensions.x + this.hitboxOffsets.dimensions.x,
                    this.dimensions.y + this.hitboxOffsets.dimensions.y,
                );
            }
    }
	
	onCollision(collider) {
		super.onCollision(collider);
		this.checkTargetedStone(collider);
		
	}

	delayPickup() {
		const interval = 1.5;
		const duration = 1.5;
		return timer.addTask(() => {}, interval, duration,() => {
			this.isCollidable = true;
		});
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
