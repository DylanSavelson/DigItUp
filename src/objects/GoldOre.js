import Stone from './Stone.js';

export default class Gold extends Stone {
    /**
     * The second tier ore strong enough to help cultivate more rare ores worth more.
     */
    constructor(sprites, position, player) {
        super(sprites, position, player); 
    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(2);
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