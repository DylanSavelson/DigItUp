import Animation from '../../../lib/Animation.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import Direction from '../../enums/Direction.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { input } from '../../globals.js';
import Input from '../../../lib/Input.js';
import { getRandomPositiveInteger } from '../../../lib/Random.js';

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
		this.animation = new Animation([0,1,2,3,4,5,6,7], 0.25)
		this.yawnAnimation = new Animation([8,9,9,10,10,10,11,11,11], 0.4, 1)
	}

	enter() {
		this.player.sprites = this.player.idleSprites;
		this.player.currentAnimation = this.animation;
	}

	update() {
		this.checkForMovement();
		this.characterYawn();
	}

	checkForMovement() {
		if (input.isKeyPressed(Input.KEYS.S)) {
			this.player.direction = Direction.Down;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.D)) {
			this.player.direction = Direction.Right;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.W)) {
			this.player.direction = Direction.Up;
			this.player.changeState(PlayerStateName.Walking);
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
	}

	characterYawn()
	{
		if(this.player.currentAnimation === this.yawnAnimation && this.player.currentAnimation.isDone())
		{
			this.player.currentAnimation.timesPlayed = 0;
			this.player.currentAnimation = this.animation;

		}
		if(getRandomPositiveInteger(1,5000) === 5)
		{
			this.player.currentAnimation = this.yawnAnimation;
		}
	}
}
