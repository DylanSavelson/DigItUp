import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import PickaxeLevel from "../enums/PickaxeLevel.js";
import { images } from "../globals.js";
import GameEntity from "./GameEntity.js";

export default class Pickaxe extends GameEntity {

    /**
     * Represents the backend of the users pickaxe
     *
     */
    constructor() {
        super();
        this.coinMultiplier = 1.0;
        this.sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Pickaxes),
			16,
			16
        );
		this.pickLevels = {
            Wood: {
                walk: ImageName.PlayerWoodWalk,
                idle: ImageName.PlayerWoodIdle,
                swing: ImageName.PlayerWoodSwing,
            },
            Iron: {
                walk: ImageName.PlayerIronWalk,
                idle: ImageName.PlayerIronIdle,
                swing: ImageName.PlayerIronSwing,
            },
            Gold: {
                walk: ImageName.PlayerGoldWalk,
                idle: ImageName.PlayerGoldIdle,
                swing: ImageName.PlayerGoldSwing,
            },
            Diamond: {
                walk: ImageName.PlayerDiamondWalk,
                idle: ImageName.PlayerDiamondIdle,
                swing: ImageName.PlayerDiamondSwing,
            }
        };
        this.pickLevel = PickaxeLevel.Wood;
        this.pickLevelInt = 0;
        this.levelUpCoins = 100;
        this.levelUpOres = 10;
        this.levelUpMessage = "10x Iron";
        this.stone = 20;
        this.iron = 10;
        this.gold = 10;
        this.diamonds = 7;
        this.explosive = 5;
        this.health = 3;
    }

    update(dt)
    {
        this.changePickMulties();
    }

    changePickMulties()
    {
        switch (this.pickLevel) {
            case PickaxeLevel.Iron:
                this.coinMultiplier = 1.5;
                this.stone = 15;
                this.iron = 11;
                this.gold = 11;
                this.diamonds = 9;
                this.explosive = 5;
                this.health = 4;  
                break;
            case PickaxeLevel.Gold:
                this.coinMultiplier = 2.0;
                this.stone = 10;
                this.iron = 12;
                this.gold = 12;
                this.diamonds = 11;
                this.explosive = 4;
                this.health = 6; 
                break;
            case PickaxeLevel.Diamond:
                this.coinMultiplier = 2.5;
                this.stone = 0;
                this.iron = 14;
                this.gold = 14;
                this.diamonds = 17;
                this.explosive = 3;
                this.health = 7; 
                break;
            default:
                this.coinMultiplier = 1.0;
        }
    }

    

}
