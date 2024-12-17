import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { images } from "../globals.js";
import GameEntity from "./GameEntity.js";

export default class Pickaxe extends GameEntity {

    /**
     * Represents the backend of the users pickaxe
     *
     */
    constructor(player) {
        super();
        this.player = player;
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
        this.pickLevel = "Wood"
        this.pickLevelInt = 0;
        this.levelUpCoins = 100;
        this.levelUpOres = 10;
        this.levelUpMessage = "10x Iron";
    }

    update(dt)
    {
        this.changePickMulti();
    }

    changePickMulti()
    {
        switch (this.pickLevel) {
            case "Iron":
                this.coinMultiplier = 1.5;
                break;
            case "Gold":
                this.coinMultiplier = 2.0;
                break;
            case "Diamond":
                this.coinMultiplier = 2.5;
                break;
            default:
                this.coinMultiplier = 1.0;
        }
    }

    upgrade()
    {
        switch (this.pickLevel) {
            case "Wood":
                if(this.levelUpCoins <= this.player.backpack.coins && this.levelUpOres <= this.player.backpack.iron)
                {
                    this.pickLevelInt++;
                    this.player.backpack.iron-= 10;
                    this.player.backpack.coins-= this.levelUpCoins;
                    this.levelUpCoins = 200;
                    this.levelUpMessage = "10x Gold";
                    this.pickLevel = "Iron";
                    return true;
                }
                else
                {
                    return false;
                }
            case "Iron":
                if(this.levelUpCoins <= this.player.backpack.coins && this.levelUpOres <= this.player.backpack.gold)
                {
                    this.pickLevelInt++;
                    this.player.backpack.gold -= 10;
                    this.player.backpack.coins -= this.levelUpCoins;
                    this.levelUpCoins = 300;
                    this.levelUpMessage = "10x Diamond";
                    this.pickLevel = "Gold";
                    return true;
                }
                else
                {
                    return false;
                }
            case "Gold":
                if(this.levelUpCoins <= this.player.backpack.coins && this.levelUpOres <= this.player.backpack.diamonds)
                {
                    this.pickLevelInt++;
                    this.player.backpack.diamonds -= 10;
                    this.player.backpack.coins -= this.levelUpCoins;
                    this.levelUpMessage = "Maxed!";
                    this.pickLevel = "Diamond";
                    return true;
                }
                else
                {
                    return false;
                }
        }
    }

}
