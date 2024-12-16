import ImageName from "../enums/ImageName.js";
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
        this.pickLevel = "Iron"
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

}
