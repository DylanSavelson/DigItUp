import Vector from '../../lib/Vector.js';
import Stone from './Stone.js';
import Hitbox from '../../lib/Hitbox.js';

export default class Iron extends Stone {
    /**
     * The first tier ore strong enough to help cultivate more rare ores worth more.
     */
    constructor(sprites, position, player) {
        super(sprites, position, player); 
    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        this.setPositionsAfterMined(1);
    }

}
