import Input from '../../../lib/Input.js';
import State from '../../../lib/State.js';
import GameStateName from '../../enums/GameStateName.js';
import ImageName from '../../enums/ImageName.js';
import SoundName from '../../enums/SoundName.js';
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	images,
	input,
	sounds,
	stateMachine,
	timer,
} from '../../globals.js';

export default class TitleScreenState extends State {
	/**
	 * Displays a title screen where the player
	 * can press enter to start a new game.
	 */
	constructor() {
		super();
		this.menuOptions = {
			start: 'Start',
			load: 'Load Game',
		};
		this.highlighted = this.menuOptions.start;
	}

	enter() {
		this.highlighted = this.menuOptions.start;
	}

	exit() {
	}

	update(dt) {
		sounds.play(SoundName.Music);
		if (input.isKeyPressed(Input.KEYS.W)) 
		{
			this.highlighted = this.menuOptions.start;
		}
		else if (input.isKeyPressed(Input.KEYS.S))
		{
			this.highlighted = this.menuOptions.load;

		}
		else if (input.isKeyPressed(Input.KEYS.ENTER)) {
			if (this.highlighted === this.menuOptions.start)
				stateMachine.change(GameStateName.Play, false);
			else
			{
				stateMachine.change(GameStateName.Play, true);
			}
		}
	}

	render() {
		images.render(ImageName.Background, 0, 0);
		context.font = '70px Canterbury';
		context.fillStyle = 'white';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Dig It Up', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 30);
		context.font = '30px small';
		context.fillStyle = this.highlighted === this.menuOptions.start ? "red" : "white";
		context.fillText(`${this.menuOptions.start}`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.7);
		context.fillStyle = this.highlighted === this.menuOptions.load ? "red" : "white";
		context.fillText(`${this.menuOptions.load}`, CANVAS_WIDTH * 0.5, CANVAS_HEIGHT * 0.8);
	}
}
