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
			[Direction.Up]: new Animation([4, 5, 6, 7], 0.1, 1),
			[Direction.Down]: new Animation([0, 1, 2, 3], 0.1, 1),
			[Direction.Left]: new Animation([12, 13, 14, 15], 0.1, 1),
			[Direction.Right]: new Animation([8, 9, 10, 11], 0.1, 1),
		};
	}

	enter() {
		sounds.play(SoundName.Pickaxe);
		//this.player.sprites = this.player.pickaxeSwingingSprites;
		this.player.currentAnimation = this.animation[this.player.direction];
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
