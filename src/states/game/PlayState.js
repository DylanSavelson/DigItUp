import { context, debug, sounds, stateMachine, timer } from '../../globals.js';
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import MineShaft from '../../objects/MineShaft.js';
import { roundedRectangle } from '../../../lib/Drawing.js';
import Stone from '../../objects/Stone.js';

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
	
	renderTargetedStone() {
		context.save();
		context.fillStyle = 'rgb(255, 255, 255, 0.5)';
		roundedRectangle(
			context,
			this.player.targetedStone.position.x,
			this.player.targetedStone.position.y,
			Stone.WIDTH,
			Stone.HEIGHT,
			10,
			true,
			false
		);
		context.restore();
	}
	
	render() {
		this.mineShaft.render();

		if(this.player.targetedStone)
			this.renderTargetedStone();

	}
}
