import Input from "../../../lib/Input.js";
import State from "../../../lib/State.js";
import GameStateName from "../../enums/GameStateName.js";
import ImageName from "../../enums/ImageName.js";
import SoundName from "../../enums/SoundName.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, input, sounds, stateMachine, timer } from "../../globals.js";

export default class VictoryState extends State {
	constructor() {
		super();
		this.dialogue = true;
		this.displayTime = null;
		this.opacity = 1;
		this.opacity1 = 0;
	}
	enter(totalTime) {
		sounds.stop(SoundName.Elevator);
		this.dialogue = true;
		//https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
		this.displayTime = new Date(totalTime * 1000).toISOString().slice(11, 19);
	}

	update() {
		if(this.dialogue === false)
		{

		}
		if (input.isKeyPressed(Input.KEYS.SPACE)) {
			if(this.opacity === 1)
			{
				timer.addTask(()=>
				{
					if(this.opacity > 0)
						this.opacity -= 0.01;
					else
					{
						if(this.opacity1 < 1)
							this.opacity1 += 0.005;
					}
					
				},
				0.1);
			}
			else if(this.opacity <= 0 && this.opacity1 >= 1)
				stateMachine.change(GameStateName.TitleScreen);
		}


	}

	render() {
		images.render(ImageName.Background, 0, 0);
		context.font = '40px small';
		context.fillStyle = `rgb(255, 255, 255, ${this.opacity})`;
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText(`You got free in`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
		context.fillText(`${this.displayTime}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

		if(this.opacity1 > 0)
		{
			context.fillStyle = `rgb(255, 255, 255, ${this.opacity1})`;
			context.fillText(`but were you ever`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40);
		context.fillText(` really captive?`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
		}

		context.font = '30px small';
		context.fillStyle = 'white';
		context.fillText(
			'press space to continue',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 40
		);
	}
}
