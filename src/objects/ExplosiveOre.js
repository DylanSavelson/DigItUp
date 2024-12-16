import Stone from '../objects/Stone.js';

export default class Explosive extends Stone {
    /**
     * The explodes and does damage to user unless they have a defuse kit
     */
    constructor(sprites, position, player) {
        super(sprites, position, player); 
    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(4);
    }



}
