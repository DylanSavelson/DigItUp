import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';


export default class Backpack extends GameObject {
    static WIDTH = 500;
    static HEIGHT = 500;
    static dimensions = new Vector(this.WIDTH,this.HEIGHT)
    /**
     * The backpack, where all ores, defuse kits and coins are stored
     */
    constructor(sprites, position, player) {
        super(Backpack.dimensions, position);
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
    }

    render()
    {
        super.render();
        
    }
    update(dt)
    {
    }

}
