import { debug, sounds, stateMachine, timer } from '../../globals.js';
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Room from '../../objects/Room.js';

export default class PlayState extends State {
	constructor() {
		super();
		this.player = new Player();
		this.currentRoom = new Room(this.player);
		
	}

	update(dt) {
		debug.update();
		this.player.currentAnimation.update(dt);
		timer.update(dt);
		this.currentRoom.update(dt);
		
	}

	render() {
		this.currentRoom.render();
	}
}
