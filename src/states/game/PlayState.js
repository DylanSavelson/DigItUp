import { debug, sounds, stateMachine, timer } from '../../globals.js';
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import MineShaft from '../../objects/MineShaft.js';

export default class PlayState extends State {
	constructor() {
		super();
		this.player = new Player();
		this.mineShaft = new MineShaft(this.player);
		
	}

	update(dt) {
		debug.update();
		this.player.currentAnimation.update(dt);
		timer.update(dt);
		this.mineShaft.update(dt);
		
	}

	render() {
		this.mineShaft.render();
	}
}
