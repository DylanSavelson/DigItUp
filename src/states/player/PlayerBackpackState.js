
import { roundedRectangle } from '../../../lib/Drawing.js';
import Input from '../../../lib/Input.js';
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import PlayerStateName from '../../enums/PlayerStateName.js';
import { context, input } from '../../globals.js';
import Backpack from '../../objects/Backpack.js';


export default class PlayerBackpackState extends State {
	/**
	 * In this state, the player is in the backpack 
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
	}

    enter()
    {
        
    }

	update(dt) {
        this.checkForKeys();
	}

    checkForKeys() {
		if (input.isKeyPressed(Input.KEYS.ESCAPE)) {
			this.player.changeState(PlayerStateName.Idle);
		}
		else if (input.isKeyPressed(Input.KEYS.B)) {
			this.player.changeState(PlayerStateName.Idle);
		}
	}


}
