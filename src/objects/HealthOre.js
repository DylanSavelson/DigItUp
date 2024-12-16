import Stone from './Stone.js';

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

}
