import GameObject from '../objects/GameObject.js';
import Vector from '../../lib/Vector.js';
import Sprite from '../../lib/Sprite.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, input, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js'
import PlayerStateName from '../enums/PlayerStateName.js';
import Input from '../../lib/Input.js';
import Stone from './Stone.js';
import { roundedRectangle } from '../../lib/Drawing.js';

export default class ShopKeeper extends GameObject {
	static WIDTH = 64;
	static HEIGHT = 32;
    static SCREEN_WIDTH = CANVAS_WIDTH / Stone.WIDTH - 2;
    static SCREEN_HEIGHT = Math.floor(CANVAS_HEIGHT / Stone.WIDTH);
    static DISPLAY_WIDTH = 300;
    static DISPLAY_HEIGHT = 190;
    static RENDER_OFFSET_X = (CANVAS_WIDTH - ShopKeeper.SCREEN_WIDTH * Stone.WIDTH) / 2;
    static RENDER_OFFSET_Y = (CANVAS_HEIGHT - ShopKeeper.SCREEN_HEIGHT * Stone.WIDTH) / 2;
    static TOP_EDGE = ShopKeeper.RENDER_OFFSET_Y;
    static BOTTOM_EDGE = CANVAS_HEIGHT - ShopKeeper.RENDER_OFFSET_Y
    static LEFT_EDGE = ShopKeeper.RENDER_OFFSET_X - 40;
    static CENTER_Y = Math.floor(
        ShopKeeper.TOP_EDGE + (ShopKeeper.BOTTOM_EDGE - ShopKeeper.TOP_EDGE) / 2
    );
	static dimensions = new Vector(this.WIDTH,this.HEIGHT)
    static display_position = new Vector(ShopKeeper.LEFT_EDGE + 50, ShopKeeper.CENTER_Y - 100)
	/**
	 * The elevator used to bring player to the surface
	 */
	constructor(position, player) {
		super(ShopKeeper.dimensions, position);
		this.currentFrame = 0;
		this.player = player;
		this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.ShopKeeper),
			ShopKeeper.WIDTH,
			ShopKeeper.HEIGHT
		);
        this.renderPriority = 102
        this.isCollidable = true;
        this.isSolid = true;
        this.player.shopKeeper = this;
        this.display = true;
        this.updatingFrame = false;
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
        this.options = null;
	}

	
	update(dt)
	{
        this.updateFrame();
        this.checkForBuyOrSell();


	}
    checkForBuyOrSell()
    {
        if (this.display && input.isMouseButtonPressed(Input.MOUSE.LEFT)) {
            const mousePos = input.getMousePosition();
    
            this.options.forEach(option => {
                if (
                    mousePos.x > option.buyZone.x &&
                    mousePos.x < option.buyZone.x + option.buyZone.width &&
                    mousePos.y > option.buyZone.y &&
                    mousePos.y < option.buyZone.y + option.buyZone.height
                ) {
                    this.handleBuy(option);
                } else if (
                    mousePos.x > option.sellZone.x &&
                    mousePos.x < option.sellZone.x + option.sellZone.width &&
                    mousePos.y > option.sellZone.y &&
                    mousePos.y < option.sellZone.y + option.sellZone.height
                ) {
                    this.handleSell(option);
                }
            });
        }
    }
    render()
    {
        super.render();
        if(this.display)
        {
            context.save();
            context.fillStyle = 'rgb(99, 48, 0)';
            context.strokeStyle = 'black';
            context.lineWidth = 2; 
        
            roundedRectangle(
                context,
                ShopKeeper.display_position.x,
                ShopKeeper.display_position.y,
                ShopKeeper.DISPLAY_WIDTH,
                ShopKeeper.DISPLAY_HEIGHT,
                10,
                true,  
                false  
            );
            
            roundedRectangle(
                context,
                ShopKeeper.display_position.x,
                ShopKeeper.display_position.y,
                ShopKeeper.DISPLAY_WIDTH,
                ShopKeeper.DISPLAY_HEIGHT,
                10,
                false, 
                true 
            );

            context.font = '40px canterbury';
            context.fillStyle = 'black';
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillText('Dripstone Depot', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 80);

            context.font = '10px small';

            this.options = [
                { sprite: this.oreSprites[0], x: CANVAS_WIDTH / 4 - 40, y: CANVAS_HEIGHT / 2 - 20, buyPrice: 20, sellPrice: 5 },
                { sprite: this.oreSprites[1], x: CANVAS_WIDTH / 4 + 10, y: CANVAS_HEIGHT / 2 - 20, buyPrice: 30, sellPrice: 10 },
                { sprite: this.oreSprites[2], x: CANVAS_WIDTH / 4 + 60, y: CANVAS_HEIGHT / 2 - 20, buyPrice: 40, sellPrice: 20 },
                { sprite: this.oreSprites[3], x: CANVAS_WIDTH / 4 + 110, y: CANVAS_HEIGHT / 2 - 20, buyPrice: 50, sellPrice: 30 }
            ];
    
            this.options.forEach((option) => {
                option.sprite.render(option.x, option.y);
                context.fillText(`Buy ${option.buyPrice}¢`, option.x + 12, CANVAS_HEIGHT / 2);
                context.fillText(`Sell ${option.sellPrice}¢`, option.x + 12, CANVAS_HEIGHT / 2 + 10);
            });

            this.coin[0].render(CANVAS_WIDTH / 2 - 120 - (2.2* this.player.backpack.coins.toString().length), CANVAS_HEIGHT / 2 + 65);

            context.fillText(
                this.player.backpack.coins.toString(),
                CANVAS_WIDTH / 2 - 100,
                CANVAS_HEIGHT / 1.5 + 40
            );

            this.options = this.options.map(option => ({
                x: option.x,
                y: option.y,
                width: 32,
                height: 32,
                buyZone: { x: option.x, y: option.y, width: 32, height: 16 },
                sellZone: { x: option.x, y: option.y + 16, width: 32, height: 16 },
                buyPrice: option.buyPrice,
                sellPrice: option.sellPrice
            }));
            context.restore();
            
        }

    }

    async updateFrame()
    {
        if(!this.updatingFrame)
        {
            this.updatingFrame = true;
            await timer.addTask(()=> {
                if (this.currentFrame === 0)
                {
                    this.currentFrame++;
                }
                else
                {
                    this.currentFrame--;
                }
            },1.2,1.2, () =>{
                this.updatingFrame = false;
            })
        }

    }
	
	onCollision(collider) {
		super.onCollision(collider);
        this.checkForKeys();

	}

    checkForKeys() {
        if (input.isKeyPressed(Input.KEYS.F)) {
            this.player.changeState(PlayerStateName.Shop);
        }
	}

    handleBuy(option) {
        if (this.player.backpack.coins >= option.buyPrice) {
            this.player.backpack.coins -= option.buyPrice;
            console.log(`Bought item for ${option.buyPrice}¢`);
        } else {
            console.log('Not enough coins to buy this item.');
        }
    }
    
    handleSell(option) {
        this.player.backpack.coins += option.sellPrice;
        console.log(`Sold item for ${option.sellPrice}¢`);
    }




}
