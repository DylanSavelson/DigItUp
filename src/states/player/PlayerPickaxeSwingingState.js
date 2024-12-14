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

		this.animation = new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.2, 1)
	}

	enter() {
		// sounds.play(SoundName.Pickaxe);
		this.player.sprites = this.player.pickaxeSwingingSprites;
		this.player.currentAnimation = this.animation;
	}

	exit() {
	}

	update() {
		// Idle once one pickaxe swing animation cycle has been played.
		if (this.player.currentAnimation.isDone()) {
			this.player.currentAnimation.refresh();
			this.player.changeState(PlayerStateName.Idle);
		}
	}
}
