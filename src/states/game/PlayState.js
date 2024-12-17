import { context, debug, images, sounds, stateMachine, timer } from '../../globals.js';
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import MineShaft from '../../objects/MineShaft.js';
import { roundedRectangle } from '../../../lib/Drawing.js';
import Stone from '../../objects/Stone.js';
import ImageName from '../../enums/ImageName.js';
import UserInterface from '../../services/UserInterface.js';

export default class PlayState extends State {
	constructor() {
		super();
		this.player = new Player();
		this.mineShaft = new MineShaft(this.player);
		this.player.mineShaft = this.mineShaft;
		this.userInterface = new UserInterface(this.player);
	}

	update(dt) {
		debug.update();
		this.player.currentAnimation.update(dt);
		timer.update(dt);
		this.mineShaft.update(dt);
		
	}
	render() {
		images.render(ImageName.Background, 0, 0);
		this.renderElevatorShaft();
		this.renderShopSupports();
		this.mineShaft.render();
		this.renderFloor();
		this.renderMineWall();
		this.userInterface.render();

		//if(this.player.targetedStone)
			//this.renderTargetedStone();

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
	
	renderFloor()
	{
		context.save();
		context.fillStyle = 'rgb(0, 0, 0)';
		roundedRectangle(
			context,
			MineShaft.LEFT_EDGE,
			MineShaft.BOTTOM_EDGE,
			400,
			10,
			10,
			true,
			false
		);
		context.restore();
	}

	renderMineWall()
	{
		context.save();
		context.fillStyle = 'rgb(0, 0, 0)';
		roundedRectangle(
			context,
			MineShaft.LEFT_EDGE + 40,
			MineShaft.TOP_EDGE + 32,
			3,
			128,
			0,
			true,
			false
		);
		context.restore();
	}

	renderElevatorShaft()
	{
		context.save();
		context.fillStyle = 'rgb(22, 22, 22)';
		roundedRectangle(
			context,
			MineShaft.LEFT_EDGE + 15,
			MineShaft.TOP_EDGE,
			3,
			208,
			0,
			true,
			false
		);

		roundedRectangle(
			context,
			MineShaft.LEFT_EDGE + 30,
			MineShaft.TOP_EDGE,
			3,
			208,
			0,
			true,
			false
		);

		roundedRectangle(
			context,
			MineShaft.LEFT_EDGE + 8,
			MineShaft.TOP_EDGE + 32,
			32,
			3,
			0,
			true,
			false
		);

		roundedRectangle(
			context,
			MineShaft.LEFT_EDGE + 8,
			MineShaft.TOP_EDGE,
			32,
			3,
			0,
			true,
			false
		);
		context.restore();
	}

	renderShopSupports()
	{
		context.save();
		context.fillStyle = 'rgb(34, 34, 36)';
		roundedRectangle(
			context,
			MineShaft.RIGHT_EDGE - 12,
			MineShaft.TOP_EDGE + 32,
			4,
			208,
			0,
			true,
			false
		);

		context.fillStyle = 'rgb(34, 34, 36)';
		roundedRectangle(
			context,
			MineShaft.RIGHT_EDGE - 56,
			MineShaft.TOP_EDGE + 32,
			4,
			208,
			0,
			true,
			false
		);
		context.restore();
	}

}
