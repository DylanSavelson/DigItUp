
import State from '../../../lib/State.js';
import Player from '../../entities/Player.js';
import PlayerStateName from '../../enums/PlayerStateName.js';


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

	}
    


}
