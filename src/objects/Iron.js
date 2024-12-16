import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Stone from './Stone.js';

export default class Iron extends Stone {
    static WIDTH = 32;
    static HEIGHT = 32;
    static dimensions = new Vector(this.WIDTH,this.HEIGHT)
    /**
     * The first tier ore strong enough to help cultivate more rare ores worth more.
     */
    constructor(sprites, position, player) {
        super(sprites, position, player); 
        
    }

    
    update(dt)
    {
        super.update(dt);
        if (this.mined && this.currentFrame === 11)
        {
            this.sprites = this.oreSprites
            this.currentFrame = 0;
        }
    }




}
