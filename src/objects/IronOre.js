import Stone from '../objects/Stone.js';

export default class Iron extends Stone {
    /**
     * The first tier ore strong enough to help cultivate more rare ores worth more.
     */
    static baseValue = 10;
    constructor(sprites, position, player) {
        super(sprites, position, player); 
        this.player = player;
        this.stone = false;
    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(1);
    }

	static sellValue(pickaxe)
	{
		return Math.floor(pickaxe.coinMultiplier * Iron.baseValue);
	}
	
    onCollision(collider)
    {
        super.onCollision(collider)
        if(this.mined)
        {
            this.player.backpack.iron++;
            this.cleanUp = true;
        }

    }

}
