import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { context } from '../globals.js';
import { roundedRectangle } from '../../lib/Drawing.js';
import MineShaft from './MineShaft.js';


export default class Backpack extends GameObject {
    static WIDTH = 500;
    static HEIGHT = 500;
    static dimensions = new Vector(this.WIDTH,this.HEIGHT)
    static position = new Vector(MineShaft.CENTER_X, MineShaft.CENTER_Y)
    /**
     * The backpack, where all ores, defuse kits and coins are stored
     */
    constructor(sprites, player) {
        super(Backpack.dimensions, Backpack.position);
        this.sprites = sprites;
        this.isCollidable = false;
        this.isSolid = false;
        this.player = player;
        this.maxOre = 5;
        this.stone = 0;
        this.iron = 0;
        this.gold = 0;
        this.diamonds = 0;
        this.coins = 0;
        this.defuseKits = 0;
        this.renderPriority = 101; 
    }

    render()
    {
        super.render();
        context.save();
        context.fillStyle = 'rgb(255, 255, 255, 0.5)';
        roundedRectangle(
            context,
            Backpack.position.x,
            Backpack.position.y,
            Backpack.WIDTH,
            Backpack.HEIGHT,
            10,
            true,
            false
        );
        context.restore();
    }
    update(dt)
    {
    }

}
