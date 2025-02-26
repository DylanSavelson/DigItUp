import Animation from '../../../lib/Animation.js';
import Input from '../../../lib/Input.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import Direction from '../../enums/Direction.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { input } from '../../globals.js';
import MineShaft from '../../objects/MineShaft.js';

export default class PlayerWalkingState extends State {
	/**
	 * In this state, the player can move around using the
	 * directional keys. From here, the player can go idle
	 * if no keys are being pressed. The player can also swing
	 * their sword if they press the spacebar.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.2),
			[Direction.Down]: new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.2),
			[Direction.Left]: new Animation([8, 9, 10, 11, 12, 13, 14, 15], 0.2),
			[Direction.Right]: new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.2),
		}
	}

	enter() {
		this.player.sprites = this.player.walkingSprites;
		this.player.currentAnimation = this.animation[this.player.direction];
	}

	update(dt) {
		this.handleMovement(dt);
	}

	handleMovement(dt) {
		this.player.currentAnimation = this.animation[this.player.direction];

		if (input.isKeyPressed(Input.KEYS.S)) {
			this.player.direction = Direction.Down;
			this.animation[Direction.Down] = this.animation[this.player.lastDirection];
		} else if (input.isKeyPressed(Input.KEYS.D)) {
			this.player.direction = Direction.Right;
			this.player.lastDirection = Direction.Right;
			this.player.position.x += this.player.speed * dt;

			if (
				this.player.position.x + this.player.dimensions.x >=
				MineShaft.RIGHT_EDGE - 15
			) {
				this.player.position.x =
					MineShaft.RIGHT_EDGE - this.player.dimensions.x - 15;
			}
		} else if (input.isKeyPressed(Input.KEYS.A)) {
			this.player.direction = Direction.Left;
			this.player.lastDirection = Direction.Left;
			this.player.position.x -= this.player.speed * dt;

			if (this.player.position.x <= MineShaft.LEFT_EDGE - 15) {
				this.player.position.x = MineShaft.LEFT_EDGE - 15;
			}
			if (this.player.position.y >= MineShaft.TOP_EDGE + 32 && this.player.position.x <= MineShaft.LEFT_EDGE + 15 && this.player.position.y <= MineShaft.BOTTOM_EDGE - 32 ) {
				this.player.position.x = MineShaft.LEFT_EDGE + 15;
			}
		} 
		else if (input.isKeyPressed(Input.KEYS.SPACE)) {
			this.player.updateTargetedStone();
			this.player.changeState(PlayerStateName.PickaxeSwinging);
		}
		else if (input.isKeyPressed(Input.KEYS.B)) {
			this.player.changeState(PlayerStateName.Backpack);
		}
		else if (input.isKeyPressed(Input.KEYS.E)) 
		{
			this.player.elevator.move = true;
		}
		else {
			this.player.changeState(PlayerStateName.Idle);
		}
	}

}
