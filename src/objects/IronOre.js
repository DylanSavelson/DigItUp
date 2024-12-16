import Stone from './Stone.js';

export default class Iron extends Stone {
    /**
     * The first tier ore strong enough to help cultivate more rare ores worth more.
     */
    constructor(sprites, position, player) {
        super(sprites, position, player); 
        this.player = player;
    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(1);
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
