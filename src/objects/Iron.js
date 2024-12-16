import Animation from '../../lib/Animation.js';
import GameObject from './GameObject.js';
import Vector from '../../lib/Vector.js';
import { getCollisionDirection } from '../../lib/Collision.js';
import Stone from './Stone.js';
import { timer } from '../globals.js';
import Easing from '../../lib/Easing.js';
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
        super.update(dt);
        this.setPositionsAfterMined();
    }

    setPositionsAfterMined()
    {
        if (this.mined && this.currentFrame === 11)
            {
                this.sprites = this.oreSprites
                this.currentFrame = 0;
                this.dimensions = new Vector(Stone.OREHEIGHT, Stone.OREWIDTH);
                this.hitbox = new Hitbox(
                    this.position.x + this.hitboxOffsets.position.x,
                    this.position.y + this.hitboxOffsets.position.y,
                    this.dimensions.x + this.hitboxOffsets.dimensions.x,
                    this.dimensions.y + this.hitboxOffsets.dimensions.y,
                );
            }
    }

}
