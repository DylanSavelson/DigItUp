import Animation from '../../../lib/Animation.js';
import State from '../../../lib/State.js';
import Stone from '../../objects/Stone.js';

export default class OreIdlingState extends State {

	/**
	 * In this state, the ore does not move or really do anything yet
	 *
	 * @param {Stone} ore
	 * @param {Animation} animation
	 */
	constructor(ore, animation) {
		super();

		this.ore = ore;
		this.animation = animation;
	}

	enter() {
	}

	update(dt) {}

}
