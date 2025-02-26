import {
	getRandomPositiveInteger,
	pickRandomElement,
} from '../../lib/Random.js';
import Sprite from '../../lib/Sprite.js';
import Vector from '../../lib/Vector.js';
import EnemyFactory from '../services/OreFactory.js';
import Player from '../entities/Player.js';
import Direction from '../enums/Direction.js';
import ImageName from '../enums/ImageName.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from '../globals.js';
import OreFactory from '../services/OreFactory.js';
import Stone from '../objects/Stone.js';
import OreName from '../enums/OreName.js';
import Elevator from './Elevator.js';
import ShopKeeper from './ShopKeeper.js';
import Pickaxe from '../entities/Pickaxe.js'
import Explosive from './ExplosiveOre.js';
export default class MineShaft {
	static WIDTH = CANVAS_WIDTH / Stone.WIDTH - 2;
	static HEIGHT = Math.floor(CANVAS_HEIGHT / Stone.WIDTH);
	static RENDER_OFFSET_X = (CANVAS_WIDTH - MineShaft.WIDTH * Stone.WIDTH) / 2;
	static RENDER_OFFSET_Y = (CANVAS_HEIGHT - MineShaft.HEIGHT * Stone.WIDTH) / 2;

	static TOP_EDGE = MineShaft.RENDER_OFFSET_Y;
	static BOTTOM_EDGE =
		CANVAS_HEIGHT - MineShaft.RENDER_OFFSET_Y
	static LEFT_EDGE = MineShaft.RENDER_OFFSET_X - 40;
	static RIGHT_EDGE = CANVAS_WIDTH;
	static CENTER_X = Math.floor(
		MineShaft.LEFT_EDGE + (MineShaft.RIGHT_EDGE - MineShaft.LEFT_EDGE) / 2
	);
	static CENTER_Y = Math.floor(
		MineShaft.TOP_EDGE + (MineShaft.BOTTOM_EDGE - MineShaft.TOP_EDGE) / 2
	);


	/**
	 * Represents one individual section of the dungeon complete
	 * with its own set of enemies and a switch that can open the doors.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		this.player = player;
		this.dimensions = new Vector(MineShaft.WIDTH, MineShaft.HEIGHT);
		this.entities = this.generateEntities();
		this.objects = this.generateObjects();
		this.renderQueue = this.buildRenderQueue();

		this.adjacentOffset = new Vector();
	}

	update(dt) {
		this.renderQueue = this.buildRenderQueue();
		this.cleanUpObjects();
		this.updateEntities(dt);
		this.updateObjects(dt);
		this.updateExplosive();
	}

	render() {
		this.renderQueue.forEach((elementToRender) => {
			if(elementToRender instanceof Pickaxe)
			{

			}
			else
			{
				elementToRender.render(this.adjacentOffset);
			}

		});
		this.explosives?.forEach((explosive) =>
		{
			if(explosive.mined && !explosive.cleanUp)
			{
				explosive.renderCountdown();
			}
		})
	}

	updateExplosive()
	{
		this.explosives = this.objects.filter((object) => object instanceof Explosive);
		this.explosives = this.explosives.filter((object) => !object?.cleanUp);
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

	cleanUpObjects() {
		this.objects = this.objects.filter((object) => !object?.cleanUp);
	}
	
	updateEntities(dt) {
		this.entities.forEach((entity) => {
			if (entity.health <= 0) {
				entity.isDead = true;
			}

			this.objects.forEach((object) => {
				if (object && object.didCollideWithEntity(entity.hitbox)) {
					if (object.isCollidable) {
						object.onCollision(entity);
					}
				}
			});
			entity.update(dt);
		});
	}

	updateObjects(dt) {
		this.objects.forEach((object) => {
			if(object)
			{
				object.update(dt);
			}
		});
	}



	/**
	 * @returns An array of entities which only holds player for now
	 */
	generateEntities() {
		const entities = new Array();
		
		entities.push(this.player.pickaxe);
		entities.push(this.player);

		return entities;
	}
	/**
	 * @returns An array of objects for the player to interact with.
	 */
	generateObjects() {
		const objects = [];
		objects.push(this.player.backpack);
		const stoneSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Stone),
			Stone.HEIGHT,
			Stone.WIDTH
		);
		this.generateOres(objects,stoneSprites);

		objects.push(new Elevator(new Vector(MineShaft.LEFT_EDGE + 8, MineShaft.TOP_EDGE),this.player))
		objects.push(new ShopKeeper(new Vector(MineShaft.RIGHT_EDGE - 64, MineShaft.TOP_EDGE),this.player))

		return objects;
	}

	generateOres(objects,sprites)
	{
		const oreCounts = {
			Stone: 0,
			Iron: 0,
			Gold: 0,
			Diamond: 0,
			Explosive: 0,
			Health: 0,
		};

		const pickaxe = this.player.pickaxe;
		const oreLimits = {
			Stone: pickaxe.stone,
			Iron: pickaxe.iron,
			Gold: pickaxe.gold,
			Diamond: pickaxe.diamonds,
			Explosive: pickaxe.explosive,
			Health: pickaxe.health,
		};

		const validOresLeft = Object.keys(OreName).filter(ore => oreLimits[ore] > 0);

		for(let i = 1; i <= 11; i++)
			{
				for(let j = 1; j <= 5; j++)
				{
					let oreType;

					do 
					{
						oreType = pickRandomElement(validOresLeft);
					} 
					while (oreCounts[oreType] >= oreLimits[oreType]);
		
					oreCounts[oreType]++;
						const newOre = OreFactory.createInstance(
						OreName[oreType],
						sprites,
						this.player,
						new Vector(32 * i, MineShaft.BOTTOM_EDGE - 32 * j)
					);
					objects.push(newOre);
				}
				
			}
	}

	resetMine()
	{
		const stoneSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Stone),
			Stone.HEIGHT,
			Stone.WIDTH
		);
		this.objects = this.objects.filter((object) => !(object instanceof Stone));
		this.generateOres(this.objects, stoneSprites);
	}


}
