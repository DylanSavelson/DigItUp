import Animation from '../../../lib/Animation.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import Direction from '../../enums/Direction.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { input } from '../../globals.js';
import Input from '../../../lib/Input.js';
import { getRandomPositiveInteger } from '../../../lib/Random.js';
import { getCollisionDirection } from '../../../lib/Collision.js';
import MineShaft from '../../objects/MineShaft.js';

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
		this.originalPlayerSpeed = this.player.speed*1.4;
	}

	enter() {
	}

	update(dt) {
		this.updateLocation(dt);
        this.checkforGroundHit();
	}
    
    
    updateLocation(dt)
    {
        this.player.position.y += this.originalPlayerSpeed * dt;
    }

	checkforGroundHit()
	{
		if (this.player.position.y >= MineShaft.BOTTOM_EDGE - 29 || (this.player.stoneBelow && !this.player.stoneBelow.mined)) 
		{
			this.player.changeState(PlayerStateName.Idle);
		}
	}


}
