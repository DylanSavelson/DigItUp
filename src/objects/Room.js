import {
	getRandomPositiveInteger,
	pickRandomElement,
} from '../../lib/Random.js';
import Sprite from '../../lib/Sprite.js';
import Vector from '../../lib/Vector.js';
import EnemyFactory from '../services/EnemyFactory.js';
import Player from '../entities/Player.js';
import Direction from '../enums/Direction.js';
import ImageName from '../enums/ImageName.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from '../globals.js';
import Tile from './Tile.js';

export default class Room {
	static WIDTH = CANVAS_WIDTH / Tile.TILE_SIZE - 2;
	static HEIGHT = Math.floor(CANVAS_HEIGHT / Tile.TILE_SIZE) - 2;
	static RENDER_OFFSET_X = (CANVAS_WIDTH - Room.WIDTH * Tile.TILE_SIZE) / 2;
	static RENDER_OFFSET_Y = (CANVAS_HEIGHT - Room.HEIGHT * Tile.TILE_SIZE) / 2;

	static TOP_EDGE = Room.RENDER_OFFSET_Y + Tile.TILE_SIZE;
	static BOTTOM_EDGE =
		CANVAS_HEIGHT - Room.RENDER_OFFSET_Y - Tile.TILE_SIZE - 5;
	static LEFT_EDGE = Room.RENDER_OFFSET_X + Tile.TILE_SIZE - 5;
	static RIGHT_EDGE = CANVAS_WIDTH - Tile.TILE_SIZE * 2 + 5;
	static CENTER_X = Math.floor(
		Room.LEFT_EDGE + (Room.RIGHT_EDGE - Room.LEFT_EDGE) / 2
	);
	static CENTER_Y = Math.floor(
		Room.TOP_EDGE + (Room.BOTTOM_EDGE - Room.TOP_EDGE) / 2
	);

	static TILE_TOP_LEFT_CORNER = 3;
	static TILE_TOP_RIGHT_CORNER = 4;
	static TILE_BOTTOM_LEFT_CORNER = 22;
	static TILE_BOTTOM_RIGHT_CORNER = 23;
	static TILE_EMPTY = 18;
	static TILE_TOP_WALLS = [57, 58, 59];
	static TILE_BOTTOM_WALLS = [78, 79, 80];
	static TILE_LEFT_WALLS = [76, 95, 114];
	static TILE_RIGHT_WALLS = [77, 96, 115];
	static TILE_FLOORS = [
		6, 7, 8, 9, 10, 11, 12, 25, 26, 27, 28, 29, 30, 31, 44, 45, 46, 47, 48,
		49, 50, 63, 64, 65, 66, 67, 68, 69, 87, 88, 106, 107,
	];

	/**
	 * Represents one individual section of the dungeon complete
	 * with its own set of enemies and a switch that can open the doors.
	 *
	 * @param {Player} player
	 */
	constructor(player, isShifting = false) {
		this.player = player;
		this.dimensions = new Vector(Room.WIDTH, Room.HEIGHT);
		this.entities = this.generateEntities();
		this.objects = this.generateObjects();
		this.renderQueue = this.buildRenderQueue();

		// Used for drawing when this room is the next room, adjacent to the active.
		this.adjacentOffset = new Vector();

		this.isShifting = isShifting;
	}

	update(dt) {
		this.renderQueue = this.buildRenderQueue();
		this.cleanUpEntities();
		this.updateEntities(dt);
		this.updateObjects(dt);
	}

	render() {

		this.renderQueue.forEach((elementToRender) => {
			elementToRender.render(this.adjacentOffset);
		});
	}

	/**
	 * Order the entities by their renderPriority fields. If the renderPriority
	 * is the same, then sort the entities by their bottom positions. This will
	 * put them in an order such that entities higher on the screen will appear
	 * behind entities that are lower down.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	 *
	 * The spread operator (...) returns all the elements of an array separately
	 * so that you can pass them into functions or create new arrays. What we're
	 * doing below is combining both the entities and objects arrays into one.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
	 */
	buildRenderQueue() {
		return [...this.entities, ...this.objects].sort((a, b) => {
			let order = 0;
			const bottomA = a.hitbox.position.y + a.hitbox.dimensions.y;
			const bottomB = b.hitbox.position.y + b.hitbox.dimensions.y;

			if (a.renderPriority < b.renderPriority) {
				order = -1;
			} else if (a.renderPriority > b.renderPriority) {
				order = 1;
			} else if (bottomA < bottomB) {
				order = -1;
			} else {
				order = 1;
			}

			return order;
		});
	}

	cleanUpEntities() {
		this.entities = this.entities.filter((entity) => !entity.isDead);
	}
	
	updateEntities(dt) {
		this.entities.forEach((entity) => {
			if (entity.health <= 0) {
				entity.isDead = true;
			}

			// Disallow the player to control the character while shifting.
			if (
				!this.isShifting ||
				(this.isShifting && entity !== this.player)
			) {
				entity.update(dt);
			}

			this.objects.forEach((object) => {
				if (object.didCollideWithEntity(entity.hitbox)) {
					if (object.isCollidable) {
						object.onCollision(entity);
					}
				}
			});

			// Since the player is technically always colliding with itself, skip it.
			if (entity === this.player) {
				return;
			}
		});
	}

	updateObjects(dt) {
		let newObjects = [];
		this.objects.forEach((object) => {
			object.update(dt);

			newObjects.push(object);

			this.objects = newObjects;

		});
	}



	/**
	 * @returns An array of enemies for the player to fight.
	 */
	generateEntities() {
		const entities = new Array();
		
		entities.push(this.player);

		return entities;
	}
	/**
	 * @returns An array of objects for the player to interact with.
	 */
	generateObjects() {
		const objects = [];
		
		return objects;
	}


}