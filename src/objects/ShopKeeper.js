import Animation from '../../lib/Animation.js';
import GameObject from '../objects/GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Sprite from '../../lib/Sprite.js';
import { images, input, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js';
import Easing from '../../lib/Easing.js';
import Hitbox from '../../lib/Hitbox.js';
import Direction from '../enums/Direction.js';
import PlayerStateName from '../enums/PlayerStateName.js';
import Input from '../../lib/Input.js';

export default class ShopKeeper extends GameObject {
	static WIDTH = 64;
	static HEIGHT = 32;

	static dimensions = new Vector(this.WIDTH,this.HEIGHT)
	/**
	 * The elevator used to bring player to the surface
	 */
	constructor(position, player) {
		super(ShopKeeper.dimensions, position);
		this.currentFrame = 0;
		this.player = player;
		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.ShopKeeper),
			ShopKeeper.WIDTH,
			ShopKeeper.HEIGHT
		);
        this.renderPriority = 102
        this.isCollidable = true;
        this.isSolid = true;
        this.player.shopKeeper = this;
        this.display = false;
        this.updatingFrame = false;
	}

	
	update(dt)
	{
        this.updateFrame();
	}

    async updateFrame()
    {
        if(!this.updatingFrame)
        {
            this.updatingFrame = true;
            await timer.addTask(()=> {
                if (this.currentFrame === 0)
                {
                    this.currentFrame++;
                }
                else
                {
                    this.currentFrame--;
                }
            },1.2,1.2, () =>{
                this.updatingFrame = false;
            })
        }

    }
	
	onCollision(collider) {
		super.onCollision(collider);
        this.checkForKeys()

	}

    checkForKeys() {
    if (input.isKeyPressed(Input.KEYS.F)) {
        this.player.changeState(PlayerStateName.Shop);
    }
	}




}
