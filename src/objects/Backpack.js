import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images } from '../globals.js';
import { roundedRectangle } from '../../lib/Drawing.js';
import Stone from '../objects/Stone.js';
import Sprite from '../../lib/Sprite.js';
import ImageName from '../enums/ImageName.js';


export default class Backpack extends GameObject {
    static SCREEN_WIDTH = CANVAS_WIDTH / Stone.WIDTH - 2;
    static SCREEN_HEIGHT = Math.floor(CANVAS_HEIGHT / Stone.WIDTH);
    static WIDTH = 200;
    static HEIGHT = 120;
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
    constructor(player) {
        super(Backpack.dimensions, Backpack.position);
        this.oreSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Ores),
			Stone.OREWIDTH,
			Stone.OREHEIGHT
		);
        this.coin = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Coin),
			10,
			18
        );
        this.defuse = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Defuse),
			16,
			16
        );
        this.sprites = this.oreSprites;
        this.isCollidable = false;
        this.isSolid = false;
        this.player = player;
        this.stone = 1;
        this.iron = 2;
        this.gold = 3;
        this.diamonds = 4;
        this.coins = 1000;
        this.defuseKits = 5;
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

            context.font = '30px canterbury';
            context.fillStyle = 'black';
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillText('Backpack', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);

            context.font = '10px small';
            context.fillText('Stone', CANVAS_WIDTH / 4 + 13, CANVAS_HEIGHT / 2 - 30)
            context.fillText('Iron', CANVAS_WIDTH / 4 + 53, CANVAS_HEIGHT / 2 - 30);
            context.fillText('Gold', CANVAS_WIDTH / 4 + 93, CANVAS_HEIGHT / 2 - 30);
            context.fillText('Diamond', CANVAS_WIDTH / 4 + 133, CANVAS_HEIGHT / 2 - 30);
            context.fillText('Defuse', CANVAS_WIDTH / 4  + 176, CANVAS_HEIGHT / 2 - 30);
         
            context.fillText(this.stone.toString(), CANVAS_WIDTH / 4 + 13, CANVAS_HEIGHT / 2 )
            context.fillText(this.iron.toString(), CANVAS_WIDTH / 4 + 53, CANVAS_HEIGHT / 2 );
            context.fillText(this.gold.toString(), CANVAS_WIDTH / 4 + 93, CANVAS_HEIGHT / 2);
            context.fillText(this.diamonds.toString(), CANVAS_WIDTH / 4 + 133, CANVAS_HEIGHT / 2);
            context.fillText(this.defuseKits.toString(), CANVAS_WIDTH / 4 + 176, CANVAS_HEIGHT / 2);

            this.sprites[0].render( CANVAS_WIDTH / 4 + 5, CANVAS_HEIGHT / 2 - 20);
            this.sprites[1].render( CANVAS_WIDTH / 4 + 45, CANVAS_HEIGHT / 2 - 20);
            this.sprites[2].render( CANVAS_WIDTH / 4 + 85, CANVAS_HEIGHT / 2 - 20);
            this.sprites[3].render( CANVAS_WIDTH / 4 + 125, CANVAS_HEIGHT / 2 - 20);
            this.defuse[0].render( CANVAS_WIDTH / 4 + 168, CANVAS_HEIGHT / 2 - 20);

            this.coin[0].render(CANVAS_WIDTH / 2 - 15 - (2* this.coins.toString().length), CANVAS_HEIGHT / 2 + 25);
            context.font = '10px small';

            context.fillText(
                this.coins.toString(),
                CANVAS_WIDTH / 2,
                CANVAS_HEIGHT / 1.5 - 3
            );

            context.restore();
            
        }

    }
    
    update(dt)
    {
    }

}
