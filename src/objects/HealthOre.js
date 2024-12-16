import Stone from '../objects/Stone.js';

export default class Health extends Stone {
    /**
     * This drops and ore that heals upon being picked up.
     */
    constructor(sprites, position, player) {
        super(sprites, position, player); 
    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(5);
    }

    onCollision(collider)
    {
        super.onCollision(collider)
        if(this.mined)
        {
            if(this.player.health + 2 >= this.player.totalHealth)
            {
                this.player.health+=2;
            }
            this.cleanUp = true;
        }

    }

}
