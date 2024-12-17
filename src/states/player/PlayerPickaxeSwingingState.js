import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import SoundName from "../../enums/SoundName.js";
import { sounds } from "../../globals.js";

export default class PlayerPickaxeSwingingState extends State {
	/**
	 * In this state, the player swings their pickaxe out in
	 * front of them. 
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;

		this.animation = {
			[Direction.Down]: null,
			[Direction.Left]: new Animation([15, 14, 13, 12, 11, 10, 9, 8], 0.25, 1),
			[Direction.Right]: new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.25, 1),
		}
	}

	enter() {
		this.animation[Direction.Down] = this.animation[this.player.lastDirection]
		this.player.sprites = this.player.pickaxeSwingingSprites;
		this.player.currentAnimation = this.animation[this.player.direction];
	}

	exit() {
		this.player.swinging = false;
		this.player.swung = false;
		this.player.targetedStone = null;
	}

	update() {
		if(this.player.currentAnimation.currentFrame >= (this.player.currentAnimation.frames.length / 1.6) && this.player.swung === false)
		{
			this.player.swinging = true;
			this.player.swung = true;
		}

		if(this.player.currentAnimation.currentFrame >= (this.player.currentAnimation.frames.length / 1.9))
		{
			sounds.play(SoundName.Swing);
		}
		// Idle once one pickaxe swing animation cycle has been played.
		if (this.player.currentAnimation.isDone()) {
			this.player.swinging = true;
			this.player.currentAnimation.refresh();
			this.player.changeState(PlayerStateName.Idle);
		}
	}
}
