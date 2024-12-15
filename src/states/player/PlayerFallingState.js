import Animation from '../../../lib/Animation.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import Direction from '../../enums/Direction.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { input } from '../../globals.js';
import Input from '../../../lib/Input.js';
import { getRandomPositiveInteger } from '../../../lib/Random.js';
import { getCollisionDirection } from '../../../lib/Collision.js';

export default class PlayerFallingState extends State {
	/**
	 * In this state, the player is falling unless
	 * there is a collidable object below
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
        this.originalPlayerSpeed = this.player.speed *1.2;
	}

	enter() {

	}

	update(dt) {
        this.checkforGroundHit();
        this.updateLocation(dt);
	}
    
    
    updateLocation(dt)
    {
        this.originalPlayerSpeed *= 1.04;
        this.player.position.y += this.originalPlayerSpeed * dt;
    }

	checkforGroundHit()
	{
        this.player.changeState(PlayerStateName.Idle);
	}


}
