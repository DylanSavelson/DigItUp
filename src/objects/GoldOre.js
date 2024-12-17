import Stone from '../objects/Stone.js';

export default class Gold extends Stone {
    /**
     * The second tier ore strong enough to help cultivate more rare ores worth more.
     */
    static baseValue = 15;

    constructor(sprites, position, player) {
        super(sprites, position, player); 
        this.stone = false;

    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(2);
    }
	static sellValue(pickaxe)
	{
		return Math.floor(pickaxe.coinMultiplier * Gold.baseValue);
	}
    onCollision(collider)
    {
        super.onCollision(collider)
        if(this.mined)
        {
            this.player.backpack.gold++;
            this.cleanUp = true;
        }

    }


}
