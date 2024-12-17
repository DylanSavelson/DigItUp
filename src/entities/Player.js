import GameEntity from './GameEntity.js';
import { context, DEBUG, images, sounds, timer } from '../globals.js';
import StateMachine from '../../lib/StateMachine.js';
import PlayerWalkingState from '../states/player/PlayerWalkingState.js';
import PlayerPickaxeSwingingState from '../states/player/PlayerPickaxeSwingingState.js';
import PlayerIdlingState from '../states/player/PlayerIdlingState.js';
import PlayerStateName from '../enums/PlayerStateName.js';
import Hitbox from '../../lib/Hitbox.js';
import Sprite from '../../lib/Sprite.js';
import MineShaft from '../objects/MineShaft.js';
import Direction from '../enums/Direction.js';
import SoundName from '../enums/SoundName.js';
import OreName from '../enums/OreName.js';
import PlayerFallingState from '../states/player/PlayerFallingState.js';
import PlayerBackpackState from '../states/player/PlayerBackpackState.js';
import Backpack from '../objects/Backpack.js';
import PlayerShopState from '../states/player/PlayerShopState.js';
import Pickaxe from './Pickaxe.js';
import ImageName from '../enums/ImageName.js';

export default class Player extends GameEntity {
	static WIDTH = 26;
	static HEIGHT = 24;
	static WALKING_SPRITE_WIDTH = 64;
	static WALKING_SPRITE_HEIGHT = 32;
	static IDLE_SPRITE_WIDTH = 64;
	static IDLE_SPRITE_HEIGHT = 32;
	static PICKAXE_SWINGING_SPRITE_WIDTH = 64;
	static PICKAXE_SWINGING_SPRITE_HEIGHT = 32;
	static MAX_SPEED = 100;
	static MAX_HEALTH = 6;

	/**
	 * The character the player controls in the map.
	 * Has the ability to swing a pickaxe to mine ores
	 * and will collide into objects that are collidable.
	 */
	constructor() {
		super();
		this.pickaxe = new Pickaxe();
		const currentSprites = this.pickaxe.pickLevels[this.pickaxe.pickLevel];

		this.walkingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(currentSprites.walk),
			Player.WALKING_SPRITE_WIDTH,
			Player.WALKING_SPRITE_HEIGHT
		);
		this.idleSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(currentSprites.idle),
			Player.IDLE_SPRITE_WIDTH,
			Player.IDLE_SPRITE_HEIGHT
		);
		this.pickaxeSwingingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(currentSprites.swing),
			Player.PICKAXE_SWINGING_SPRITE_WIDTH,
			Player.PICKAXE_SWINGING_SPRITE_HEIGHT
		);

		this.sprites = this.walkingSprites;
		/**
		 * Since the regular sprite and sword-swinging sprite are different dimensions,
		 * we need a position offset to make it look like one smooth animation when rendering.
		 */
		this.positionOffset = { x: 0, y: 0 };
		/**
		 * We don't want the hitbox for the player to be the size of the
		 * whole sprite. Instead, we want a much smaller area relative to
		 * the player's dimensions and position to be used to detect collisions.
		 */
		this.hitboxOffsets = new Hitbox(
			24,
			Player.WIDTH - 4,
			-12,
			-Player.HEIGHT + 6
		);
		this.position.x = MineShaft.CENTER_X - Player.WIDTH / 2;
		this.position.y = MineShaft.TOP_EDGE - Player.HEIGHT / 2;
		this.dimensions.x = Player.WIDTH;
		this.dimensions.y = Player.HEIGHT;
		this.speed = Player.MAX_SPEED;
		this.totalHealth = Player.MAX_HEALTH;
		this.health = Player.MAX_HEALTH;
		this.stateMachine = this.initializeStateMachine();
		this.renderPriority = 100;
		this.lastDirection = Direction.Right;
		this.targetedStone = null;
		this.swinging = false;
		this.swung = false;
		this.stoneBelow = null;
		this.backpack = new Backpack();
		this.elevator = null;
		this.mineShaft = null;
		this.shopKeeper = null;
		this.pickaxe = new Pickaxe(this);
	}


	render() {
		const currentSprites = this.pickaxe.pickLevels[this.pickaxe.pickLevel];

		this.walkingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(currentSprites.walk),
			Player.WALKING_SPRITE_WIDTH,
			Player.WALKING_SPRITE_HEIGHT
		);
		this.idleSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(currentSprites.idle),
			Player.IDLE_SPRITE_WIDTH,
			Player.IDLE_SPRITE_HEIGHT
		);
		this.pickaxeSwingingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(currentSprites.swing),
			Player.PICKAXE_SWINGING_SPRITE_WIDTH,
			Player.PICKAXE_SWINGING_SPRITE_HEIGHT
		);

		super.render();
	}

	updateTargetedStone()
	{
		if(this.targetedStone && this.direction != this.targetedStone.dirNumber)
		{
			this.targetedStone = null;  
		}
	}

	reset() {
		this.position.x = MineShaft.CENTER_X - Player.WIDTH / 2;
		this.position.y = MineShaft.CENTER_Y - Player.HEIGHT / 2;
		this.health = Player.MAX_HEALTH;
		this.isDead = false;
		this.alpha = 1;
		this.direction = Direction.Down;
		this.stateMachine.change(PlayerStateName.Idle);
	}

	initializeStateMachine() {
		const stateMachine = new StateMachine();

		stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
		stateMachine.add(PlayerStateName.PickaxeSwinging,new PlayerPickaxeSwingingState(this));
		stateMachine.add(PlayerStateName.Falling, new PlayerFallingState(this));	
		stateMachine.add(PlayerStateName.Backpack, new PlayerBackpackState(this));	
		stateMachine.add(PlayerStateName.Shop, new PlayerShopState(this));
		stateMachine.add(PlayerStateName.Idle, new PlayerIdlingState(this));

		stateMachine.change(PlayerStateName.Idle);

		return stateMachine;
	}

	resetMine()
	{
		this.mineShaft.resetMine();
	}

}
