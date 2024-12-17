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
	}

	enter() {
		sounds.play(SoundName.Rain);
	}

	exit() {
		sounds.stop(SoundName.Rain);
	}

	update(dt) {
		timer.update(dt);

		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.change(GameStateName.Transition, {
				fromState: this,
				toState: stateMachine.states[GameStateName.Play],
			});
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
		context.fillText(
			'press enter to begin',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 40
		);
	}
}
