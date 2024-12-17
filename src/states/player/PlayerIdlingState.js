import Animation from '../../../lib/Animation.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import Direction from '../../enums/Direction.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { input } from '../../globals.js';
import Input from '../../../lib/Input.js';
import { getRandomPositiveInteger } from '../../../lib/Random.js';
import Stone from '../../objects/Stone.js';
import { getCollisionDirection, isAABBCollision } from '../../../lib/Collision.js';
import MineShaft from '../../objects/MineShaft.js';

export default class PlayerIdlingState extends State {
	/**
	 * In this state, the player is stationary unless
	 * a directional key or the spacebar is pressed.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;

		this.animation = {
			[Direction.Up]: null,
			[Direction.Down]: null,
			[Direction.Left]: new Animation([16,17,18,19,20,21,22,23], 0.25),
			[Direction.Right]: new Animation([0,1,2,3,4,5,6,7], 0.25),
		}
		this.animation[Direction.Up] = this.animation[this.player.direction]
		this.animation[Direction.Down] = this.animation[this.player.direction]

		this.yawnAnimation = {
			[Direction.Up]: null,
			[Direction.Down]: null,
			[Direction.Left]: new Animation([24,25,25,26,26,27,27,27], 0.4, 1),
			[Direction.Right]: new Animation([8,9,9,10,10,10,11,11,11], 0.4, 1),
		}
		this.yawnAnimation[Direction.Up] = this.yawnAnimation[this.player.direction]
		this.yawnAnimation[Direction.Down] = this.yawnAnimation[this.player.direction]

	}

	enter() {
		this.player.sprites = this.player.idleSprites;
		if(this.player.lastDirection)
			this.player.currentAnimation = this.animation[this.player.lastDirection];
		else
			this.player.currentAnimation = this.animation[this.player.direction];
		this.checkFalling = true;

	}

	update() {
		this.checkForKeys();
		this.characterYawn();
		this.checkforFall();
		this.player.updateTargetedStone();
		this.checkForElevatorDeath();
	}

	checkForElevatorDeath()
	{
		if (this.player.position.y > MineShaft.BOTTOM_EDGE - 28)
		{
			//implement
			this.player.changeState(PlayerStateName.Death);
		}
	}
	checkForKeys() {
		if (input.isKeyPressed(Input.KEYS.S)) {
			this.player.direction = Direction.Down;
		} else if (input.isKeyPressed(Input.KEYS.D)) {
			this.player.direction = Direction.Right;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
		else if (input.isKeyPressed(Input.KEYS.SPACE)) {
			this.player.changeState(PlayerStateName.PickaxeSwinging);
		}
		else if (input.isKeyPressed(Input.KEYS.B)) {
			this.player.changeState(PlayerStateName.Backpack);
		}
		else if (input.isKeyPressed(Input.KEYS.E)) {
			this.player.elevator.move = true;
		}
		else if (input.isKeyPressed(Input.KEYS.Z)) {
			if(this.player.explodingOre && this.player.explodingOre.mined && !this.player.explodingOre.defused && this.player.backpack.defuseKits > 0)
            {
                this.player.explodingOre.defused = true;
                this.player.backpack.defuseKits--;
            }
		} 
	}

	characterYawn()
	{
		if(this.player.currentAnimation === this.yawnAnimation[this.player.direction] && this.player.currentAnimation.isDone())
		{
			this.player.currentAnimation.timesPlayed = 0;
			this.player.currentAnimation = this.animation[this.player.direction];

		}
		if(getRandomPositiveInteger(1,5000) === 5)
		{
			this.player.currentAnimation = this.yawnAnimation[this.player.direction];
		}
	}

	checkforFall()
	{
		if((this.player.stoneBelow === null || this.player.stoneBelow.mined) && this.player.hitbox.position.y <= MineShaft.BOTTOM_EDGE - 29 && !this.player.elevator.playerInside)
		{
			this.player.changeState(PlayerStateName.Falling);
		}
	}
}
