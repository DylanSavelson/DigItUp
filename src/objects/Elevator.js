import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Sprite from '../../lib/Sprite.js';
import { images, sounds, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js';
import Easing from '../../lib/Easing.js';
import Hitbox from '../../lib/Hitbox.js';
import Direction from '../enums/Direction.js';
import SoundName from '../enums/SoundName.js';

export default class Elevator extends GameObject {
	static WIDTH = 32;
	static HEIGHT = 32;

	static dimensions = new Vector(this.WIDTH,this.HEIGHT)
	/**
	 * The elevator used to bring player to the surface or down
	 */
	constructor(position, player) {
		super(Elevator.dimensions, position);
		this.currentFrame = 0;
		this.player = player;
		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Elevator),
			Elevator.WIDTH,
			Elevator.HEIGHT
		);
        this.renderPriority = 102
        this.isCollidable = true;
        this.isSolid = true;
        this.playerInside = false;
        this.move = false;
        this.player.elevator = this;
        this.lastDirection = Direction.Up;
        this.moving = false;
        this.hitbox.dimensions.y = 1;
        this.hitbox.position.y += 32;
	}

	
	update(dt)
	{
        this.moveUpAndDown();
        this.checkIfPlayerInside();
        this.playSound();
	}


	
	onCollision(collider) {
		super.onCollision(collider);  
	}


    checkIfPlayerInside()
    {
        const distance = this.player.hitbox.position.y - this.hitbox.position.y;
        if(this.player.hitbox.position.x - 14 < this.hitbox.position.x && ((distance > -7 && this.lastDirection == Direction.DOwn) || (distance < 153 && this.lastDirection == Direction.Up)))
        {
            this.playerInside = true;
        }
        else
        {
            this.playerInside = false;
        }
    }
    
    playSound()
    {
        if(this.moving)
        {
            sounds.play(SoundName.Elevator);
        }
        else
        {
            sounds.stop(SoundName.Elevator);
        }
    }
    moveUpAndDown()
    {
        if (this.move && !this.moving)
        {
            this.moving = true;
            if(this.lastDirection === Direction.Up)
            {
                this.moveDown(this);
                if (this.playerInside)
                {
                    this.moveDown(this.player)
                }
            }
            else
            {
                this.moveUp(this);
                if (this.playerInside)
                {
                    this.moveUp(this.player)
                    this.player.resetMine();
                }
            }

        }
    }
    async moveUp(elevatorOrPlayer)
    {
        const movement = Elevator.HEIGHT*5;
        await Promise.all([
            timer.tweenAsync(
                elevatorOrPlayer.position,
                {  y: elevatorOrPlayer.position.y - movement },
                4,
                Easing.easeInOutQuad
            ),
            timer.tweenAsync(
                elevatorOrPlayer.hitbox.position,
                {  y: elevatorOrPlayer.hitbox.position.y - movement },
                4,
                Easing.easeInOutQuad
            )
        ]);
        this.moving = false;
        this.move = false;
        this.lastDirection = Direction.Up;
    }

    async moveDown(elevatorOrPlayer)
    {
        const movement = Elevator.HEIGHT*5;
        await Promise.all([
            timer.tweenAsync(
                elevatorOrPlayer.position,
                {  y: elevatorOrPlayer.position.y + movement },
                4,
                Easing.easeOutQuad
            ),
            timer.tweenAsync(
                elevatorOrPlayer.hitbox.position,
                {  y: elevatorOrPlayer.hitbox.position.y + movement },
                4,
                Easing.easeOutQuad
            )
        ]);
        this.moving = false;
        this.move = false;
        this.lastDirection = Direction.Down;
    }



}
