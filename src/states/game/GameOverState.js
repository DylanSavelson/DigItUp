import Input from "../../../lib/Input.js";
import State from "../../../lib/State.js";
import GameStateName from "../../enums/GameStateName.js";
import ImageName from "../../enums/ImageName.js";
import SoundName from "../../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, input, sounds, stateMachine } from "../../globals.js";

export default class GameOverState extends State {
	constructor() {
		super();
	}
	enter() {
		sounds.stop(SoundName.Elevator);
	}

	update() {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.change(GameStateName.TitleScreen);
		}
	}

	render() {
		images.render(ImageName.Background, 0, 0);
		context.font = '60px small';
		context.fillStyle = 'crimson';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		context.font = '30px small';
		context.fillStyle = 'white';
		context.fillText(
			'press enter to continue',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 40
		);
	}
}
