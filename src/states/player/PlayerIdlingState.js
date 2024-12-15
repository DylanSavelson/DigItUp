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
		//if you go up or down he always idles to right even if you were facing left
		this.player.sprites = this.player.idleSprites;
		this.player.currentAnimation = this.animation[this.player.direction];
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
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
		else if (input.isKeyPressed(Input.KEYS.SPACE)) {
			this.player.changeState(PlayerStateName.PickaxeSwinging);
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
}
