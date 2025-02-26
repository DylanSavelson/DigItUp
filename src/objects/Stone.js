import Animation from '../../lib/Animation.js';
import GameObject from '../objects/GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Sprite from '../../lib/Sprite.js';
import { images, sounds, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js';
import Easing from '../../lib/Easing.js';
import Hitbox from '../../lib/Hitbox.js';
import SoundName from '../enums/SoundName.js';
import PickaxeLevel from '../enums/PickaxeLevel.js';

export default class Stone extends GameObject{
	static WIDTH = 32;
	static HEIGHT = 32;
	static OREWIDTH = 16;
	static OREHEIGHT = 16;
	static dimensions = new Vector(this.WIDTH,this.HEIGHT)
	static baseValue = 5;

	/**
	 * The base ore, can contain other ores or just a stone.
	 */
	constructor(sprites, position, player) {
		super(Stone.dimensions,position);
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
		this.exploded = false;
		this.stopHovering = false;
		this.stone = true;
		this.explosive = false;
	}

	static sellValue(pickaxe)
	{
		return Math.floor(pickaxe.coinMultiplier * Stone.baseValue);
	}
	
	update(dt)
	{
		this.getHit();
		if(!this.exploded)
			this.checkHover();
		if (this.shouldCallSetPositionsAfterMined) 
		{
			this.setPositionsAfterMined(0);
		}
		this.checkStoneBelowNotMined();
	}

	
	getHit() {
        if(this.player.targetedStone === this && this.player.swinging === true && !this.mined)
		{
			if(this.player.pickaxe.pickLevel === PickaxeLevel.Wood)
			{
				this.currentFrame++;
			}
			else if (this.player.pickaxe.pickLevel === PickaxeLevel.Iron)
			{
				if(this.currentFrame < 2)
					this.currentFrame += 2;
				else
					this.currentFrame ++;
			}
			else if (this.player.pickaxe.pickLevel === PickaxeLevel.Gold)
			{
				if(this.currentFrame < 4)
					this.currentFrame += 2;
				else
					this.currentFrame++;
			}
			else{
				if(this.currentFrame < 4)
					this.currentFrame += 4;
				else
					this.currentFrame+=1;
			}
			this.player.swinging = false;
			sounds.play(SoundName.Pickaxe);
			if(this.currentFrame === 5)
			{
				this.mined = true;
				this.isCollidable = false;
				this.isSolid = false;
				this.delayPickup()
			}
		}

    }

	checkHover()
	{
		if (this.mined)
			{
				if (this.positionChanged)
				{
					this.position.x += 8;
					this.position.y += 11;
					this.positionChanged = false;
				}
				if(!this.hovering && !this.stopHovering)
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
		if(this.mined && !this.explosive)
		{
			sounds.play(SoundName.Pickup)
		}
		if(this.mined && this.stone)
		{
			this.player.backpack.stone++;
			this.cleanUp = true;
		}
	}

	delayPickup() {
		const interval = .75;
		const duration = .75;
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

	checkStoneBelowNotMined()
	{
		if(this.player.stoneBelow === this && this.player.stoneBelow.mined)
		{
			this.player.stoneBelow = null;
		}
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
