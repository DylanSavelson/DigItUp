import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Sprite from '../../lib/Sprite.js';
import { images, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js';
import Easing from '../../lib/Easing.js';
import Hitbox from '../../lib/Hitbox.js';
import Direction from '../enums/Direction.js';

export default class Elevator extends GameObject {
	static WIDTH = 32;
	static HEIGHT = 32;

	static dimensions = new Vector(this.WIDTH,this.HEIGHT)
	/**
	 * The elevator used to bring player to the surface
	 */
	constructor(position, player) {
		super(Elevator.dimensions, position);
        this.isCollidable = true;
		this.isSolid = false;
		this.currentFrame = 0;
		this.player = player;
		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Elevator),
			Elevator.WIDTH,
			Elevator.HEIGHT
		);
        this.renderPriority = 102
        this.playerInside = false;
        this.move = false;
        this.player.elevator = this;
        this.lastDirection = Direction.Up;
        this.moving = false;
	}

	
	update(dt)
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
                }
            }

        }
	}


	
	onCollision(collider) {
		super.onCollision(collider);		
	}

    async moveUp(elevatorOrPlayer)
    {
        const movement = Elevator.HEIGHT*5;
        await timer.tweenAsync(
            elevatorOrPlayer.position,
            {  y: elevatorOrPlayer.position.y - movement },
            0.4,
            Easing.easeInOutQuad
        );
        this.moving = false;
        this.move = false;
        this.lastDirection = Direction.Up;
    }

    async moveDown(elevatorOrPlayer)
    {
        const movement = Elevator.HEIGHT*5;
        await timer.tweenAsync(
            elevatorOrPlayer.position,
            {  y: elevatorOrPlayer.position.y + movement },
            0.4,
            Easing.easeInOutQuad
        );
        this.moving = false;
        this.move = false;
        this.lastDirection = Direction.Down;
    }



}
