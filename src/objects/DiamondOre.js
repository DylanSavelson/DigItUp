import Stone from '../objects/Stone.js';

export default class Diamond extends Stone {
    /**
     * The strongest ore strong enough to help cultivate more rare ores worth more.
     */
    static baseValue = 20;
    constructor(sprites, position, player) {
        super(sprites, position, player); 
    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(3);
    }

    static sellValue(pickaxe)
	{
		return Math.floor(pickaxe.coinMultiplier * Diamond.baseValue);
	}
    onCollision(collider)
    {
        super.onCollision(collider)
        if(this.mined)
        {
            this.player.backpack.diamonds++;
            this.cleanUp = true;
        }

    }


}
