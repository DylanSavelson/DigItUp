import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, context } from '../globals.js';
import { roundedRectangle } from '../../lib/Drawing.js';
import Stone from './Stone.js';


export default class Backpack extends GameObject {
    static SCREEN_WIDTH = CANVAS_WIDTH / Stone.WIDTH - 2;
    static SCREEN_HEIGHT = Math.floor(CANVAS_HEIGHT / Stone.WIDTH);
    static WIDTH = 200;
    static HEIGHT = 100;
    static RENDER_OFFSET_X = (CANVAS_WIDTH - Backpack.SCREEN_WIDTH * Stone.WIDTH) / 2;
    static RENDER_OFFSET_Y = (CANVAS_HEIGHT - Backpack.SCREEN_HEIGHT * Stone.WIDTH) / 2;
    static TOP_EDGE = Backpack.RENDER_OFFSET_Y;
    static BOTTOM_EDGE = CANVAS_HEIGHT - Backpack.RENDER_OFFSET_Y
    static LEFT_EDGE = Backpack.RENDER_OFFSET_X - 40;
    static CENTER_Y = Math.floor(
        Backpack.TOP_EDGE + (Backpack.BOTTOM_EDGE - Backpack.TOP_EDGE) / 2
    );
    static dimensions = new Vector(this.HEIGHT,this.WIDTH)
    static position = new Vector(Backpack.LEFT_EDGE + 100, Backpack.CENTER_Y - 75)
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
        this.display = false;
        this.renderPriority = 101;
    }

    render()
    {
        if(this.display)
        {
            context.save();
            context.fillStyle = 'rgb(99, 48, 0)';
            context.strokeStyle = 'black';
            context.lineWidth = 2; 
        
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
            
            roundedRectangle(
                context,
                Backpack.position.x,
                Backpack.position.y,
                Backpack.WIDTH,
                Backpack.HEIGHT,
                10,
                false, 
                true 
            );
            
            context.restore();
            
        }

    }
    
    update(dt)
    {
    }

}
