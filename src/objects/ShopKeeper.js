import GameObject from '../objects/GameObject.js';
import Vector from '../../lib/Vector.js';
import Sprite from '../../lib/Sprite.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, input, sounds, stateMachine, timer } from '../globals.js';
import ImageName from '../enums/ImageName.js'
import PlayerStateName from '../enums/PlayerStateName.js';
import Input from '../../lib/Input.js';
import Stone from './Stone.js';
import { roundedRectangle } from '../../lib/Drawing.js';
import Iron from './IronOre.js';
import Gold from './GoldOre.js';
import Diamond from './DiamondOre.js';
import SoundName from '../enums/SoundName.js';
import GameStateName from '../enums/GameStateName.js';
import PickaxeLevel from '../enums/PickaxeLevel.js';

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
	 * The shop used to buy and sell stuff
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
        this.defuse = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Defuse),
			16,
			16
        );
        this.renderPriority = 102
        this.isCollidable = true;
        this.isSolid = true;
        this.player.shopKeeper = this;
        this.display = false;
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
        this.freedom = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Freedom),
			16,
			16
        );
        this.options = null;
        this.saleText = "";
	}

	
	update(dt)
	{
        this.updateFrame();
        this.checkForBuyOrSell();

	}
    checkForBuyOrSell()
    {
        if (this.display && input.isMouseButtonPressed(Input.MOUSE.LEFT)) {
            let mousePos = input.getMousePosition();
            this.options.forEach(option => {
                if (mousePos.x > option.buyZone.x &&
                    mousePos.x < option.buyZone.x + option.buyZone.width &&
                    mousePos.y > option.buyZone.y &&
                    mousePos.y < option.buyZone.y + option.buyZone.height) 
                {
                    this.handleBuy(option);
                } 
                else if (mousePos.x > option.sellZone.x &&
                    mousePos.x < option.sellZone.x + option.sellZone.width &&
                    mousePos.y > option.sellZone.y &&
                    mousePos.y < option.sellZone.y + option.sellZone.height) 
                {
                    this.handleSell(option);
                }
            });
        }
    }

    checkForHover()
    {
        if (this.display && this.options) {
            let mousePos = input.getMousePosition();
            this.options.forEach(option => {
                if (mousePos.x > option.buyZone.x &&
                    mousePos.x < option.buyZone.x + option.buyZone.width &&
                    mousePos.y > option.buyZone.y &&
                    mousePos.y < option.buyZone.y + option.buyZone.height) 
                {
                    if(option.itemType === 5 && this.player.pickaxe.pickLevel !== PickaxeLevel.Diamond)
                    {
                        context.fillStyle = 'rgba(255, 255, 255, 0.4)'
                        context.fillRect(option.buyZone.x, option.buyZone.y, option.buyZone.width, option.buyZone.height);
                    }
                    else if (option.itemType !== 5)
                    {
                        context.fillStyle = 'rgba(255, 255, 255, 0.4)'
                        context.fillRect(option.buyZone.x, option.buyZone.y, option.buyZone.width, option.buyZone.height);
                    }

                } 
                else if (mousePos.x > option.sellZone.x &&
                    mousePos.x < option.sellZone.x + option.sellZone.width &&
                    mousePos.y > option.sellZone.y &&
                    mousePos.y < option.sellZone.y + option.sellZone.height) 
                {
                    if(option.itemType !== 5 && option.itemType !== 6)
                    {
                        context.fillStyle = 'rgba(255, 255, 255, 0.4)'
                        context.fillRect(option.sellZone.x, option.sellZone.y, option.sellZone.width, option.sellZone.height);
                    }

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
                { sprite: this.oreSprites[0], x: CANVAS_WIDTH / 4 - 20, y: CANVAS_HEIGHT / 2 - 40, buyPrice: 50, sellPrice: Stone.sellValue(this.player.pickaxe)},
                { sprite: this.oreSprites[1], x: CANVAS_WIDTH / 4 - 20, y: CANVAS_HEIGHT / 2, buyPrice: 75, sellPrice: Iron.sellValue(this.player.pickaxe)},
                { sprite: this.oreSprites[2], x: CANVAS_WIDTH / 4 + 30, y: CANVAS_HEIGHT / 2 - 40, buyPrice: 100, sellPrice: Gold.sellValue(this.player.pickaxe)},
                { sprite: this.oreSprites[3], x: CANVAS_WIDTH / 4 + 30, y: CANVAS_HEIGHT / 2, buyPrice: 125, sellPrice: Diamond.sellValue(this.player.pickaxe) },
                { sprite: this.defuse[0], x: CANVAS_WIDTH / 4 + 80, y: CANVAS_HEIGHT / 2 - 40, buyPrice: 20, sellPrice: 1},
                { sprite: this.freedom[0], x: CANVAS_WIDTH / 4 + 80, y: CANVAS_HEIGHT / 2, buyPrice: 1000, sellPrice: 1, freedom: true},
                { sprite :this.player.pickaxe.sprites[this.player.pickaxe.pickLevelInt], x: CANVAS_WIDTH / 4 + 170, y: CANVAS_HEIGHT / 2 - 20, buyPrice: 100, sellPrice: 1, upgrade: true}
            ];
    
            this.options.forEach((option) => {
                option.sprite.render(option.x, option.y);
                if(!option.upgrade && !option.freedom)
                {
                    context.fillText(`Buy ${option.buyPrice}¢`, option.x + 10, option.y + 20);
                    context.fillText(`Sell ${option.sellPrice}¢`, option.x + 10, option.y + 30);
                }
                else if(option.freedom)
                {
                    context.fillText(`Buy ${option.buyPrice}¢`, option.x + 10, option.y + 20);
                }
                else
                {
                    if(this.player.pickaxe.pickLevel === PickaxeLevel.Diamond)
                    {
                        context.fillText(`${this.player.pickaxe.levelUpMessage}`, option.x + 10, option.y + 20);

                    }
                    else
                    {
                        context.fillText(`Upgrade`, option.x + 10, option.y + 20);
                        context.fillText(`${this.player.pickaxe.levelUpCoins}¢`, option.x + 10, option.y + 30);
                        context.fillText(`${this.player.pickaxe.levelUpMessage}`, option.x + 10, option.y + 40);
                    }
                }

            });

            this.coin[0].render(CANVAS_WIDTH / 2 - 120 - (2.2* this.player.backpack.coins.toString().length), CANVAS_HEIGHT / 2 + 65);

            context.fillText(
                this.player.backpack.coins.toString(),
                CANVAS_WIDTH / 2 - 100,
                CANVAS_HEIGHT / 1.5 + 40
            );

            this.options = this.options.map((option, index) => ({
                x: option.x,
                y: option.y,
                buyZone: {
                    x: option.x - 12, 
                    y: option.y + 18, 
                    width: 44,
                    height: 8, 
                },
                sellZone: {
                    x: option.x - 12, 
                    y: option.y + 28, 
                    width: 44,
                    height: 8, 
                },
                itemType: 0 + index,
                buyPrice: option.buyPrice,
                sellPrice: option.sellPrice
            }));

            this.checkForHover();
            context.font = '16px small';
            context.fillStyle = 'black';
            context.fillText(this.saleText, CANVAS_WIDTH / 4 + 100, CANVAS_HEIGHT / 2 + 50);
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
        if (input.isKeyPressed(Input.KEYS.F)) 
        {
            this.player.changeState(PlayerStateName.Shop);
        }
	}

    handleBuy(option) {
        switch (option.itemType) {
            case 0: 
                if (this.player.backpack.coins >= option.buyPrice) 
                {
                    sounds.play(SoundName.Coin);
                    this.player.backpack.coins -= option.buyPrice;
                    this.player.backpack.stone++;
                    this.saleText =  `Bought 1 stone for ${option.buyPrice}¢`;
                } 
                else 
                {
                    this.saleText = "Not enough coins to buy 1 stone.";
                }
                break;
            case 1: 
                if (this.player.backpack.coins >= option.buyPrice) 
                {
                    sounds.play(SoundName.Coin);
                    this.player.backpack.coins -= option.buyPrice;
                    this.player.backpack.iron++;
                    this.saleText = `Bought 1 iron for ${option.buyPrice}¢`;
                } 
                else 
                {
                    this.saleText = 'Not enough coins to buy 1 iron.';
                }
                break;
            case 2: 
                if (this.player.backpack.coins >= option.buyPrice) 
                {
                    sounds.play(SoundName.Coin);
                    this.player.backpack.coins -= option.buyPrice;
                    this.player.backpack.gold++;
                    this.saleText = `Bought 1 gold for ${option.buyPrice}¢`;
                } 
                else 
                {
                    this.saleText ='Not enough coins to buy 1 gold.';
                }
                break;
            case 3:
                if (this.player.backpack.coins >= option.buyPrice)
                {
                    sounds.play(SoundName.Coin);
                    this.player.backpack.coins -= option.buyPrice;
                    this.player.backpack.diamonds++;
                    this.saleText =`Bought 1 diamond for ${option.buyPrice}¢`;
                } 
                else 
                {
                    this.saleText ='Not enough coins to buy 1 diamond.';
                }
                break;
            case 4: 
                if (this.player.backpack.coins >= option.buyPrice) 
                {
                    sounds.play(SoundName.Coin);
                    this.player.backpack.coins -= option.buyPrice;
                    this.player.backpack.defuseKits++;
                    this.saleText = `Bought 1 defuse kit for ${option.buyPrice}¢`;
                } 
                else 
                {
                    this.saleText ='Not enough coins to buy 1 defuse kit.';
                }
                break;
            case 5: 
                if (this.player.backpack.coins >= option.buyPrice) 
                {
                    sounds.play(SoundName.Coin);
                    stateMachine.change(GameStateName.Victory);
                }
                else
                {
                    this.saleText ='Not enough coins to buy freedom';
                }
                break;

            case 6: 
            if(this.player.pickaxe.pickLevel !== PickaxeLevel.Diamond)
            {
                if (this.player.upgrade()) 
                {
                    sounds.play(SoundName.Coin);
                    this.saleText = `Upgraded Pickaxe`;
                } 
                else 
                {
                    this.saleText ='Missing materials';
                }
                break;
            }
            default:
                break;
        }
    }
    
    handleSell(option) {
        switch (option.itemType) {
            case 0: 
                if (this.player.backpack.stone > 0) 
                {
                    this.player.backpack.coins += option.sellPrice;
                    this.player.backpack.stone -= 1;
                    this.saleText =  `Sold 1 stone for ${option.sellPrice}¢`;
                    sounds.play(SoundName.Coin);
                } 
                else 
                {
                    this.saleText = "No stone to sell.";
                }
                break;
            case 1: 
                if (this.player.backpack.iron > 0) 
                {
                    this.player.backpack.coins += option.sellPrice;
                    this.player.backpack.iron -= 1;
                    this.saleText = `Sold 1 iron for ${option.sellPrice}¢`;
                    sounds.play(SoundName.Coin);
                } 
                else 
                {
                    this.saleText = 'No iron to sell.';
                }
                break;
            case 2: 
                if (this.player.backpack.gold > 0) 
                {
                    this.player.backpack.coins += option.sellPrice;
                    this.player.backpack.gold -= 1;
                    this.saleText = `Sold 1 gold for ${option.sellPrice}¢`;
                    sounds.play(SoundName.Coin);
                } 
                else 
                {
                    this.saleText ='No gold to sell';
                }
                break;
            case 3:
                if (this.player.backpack.diamonds > 0)
                {
                    this.player.backpack.coins += option.sellPrice;
                    this.player.backpack.diamonds -= 1;
                    this.saleText =`Sold 1 diamond for ${option.sellPrice}¢`;
                    sounds.play(SoundName.Coin);
                } 
                else 
                {
                    this.saleText ='No diamond  to sell.';
                }
                break;
            case 4: 
                if (this.player.backpack.defuseKits > 0) {
                    this.player.backpack.coins += option.sellPrice;
                    this.player.backpack.defuseKits -= 1;
                    this.saleText = `Sold 1 defuse kit for ${option.sellPrice}¢`;
                    sounds.play(SoundName.Coin);
                } 
                else 
                {
                    this.saleText ='No defuse kits to sell.';
                }
                break;
            default:
                break;
        }
    }




}
