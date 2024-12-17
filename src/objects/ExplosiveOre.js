import Input from '../../lib/Input.js';
import Sprite from '../../lib/Sprite.js';
import ImageName from '../enums/ImageName.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images, input, timer } from '../globals.js';
import Stone from '../objects/Stone.js';

export default class Explosive extends Stone {
    /**
     * The explodes and does damage to user unless they have a defuse kit
     */
    static ExplosionWidth = 48;
    static ExplosionHeight = 48;

    constructor(sprites, position, player) {
        super(sprites, position, player); 
        this.explosionSprites =
        Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.Explosion),
            Explosive.ExplosionWidth,
            Explosive.ExplosionHeight
        );
        this.timeLeft = 3;
        this.counting = false;
        this.color = "red";
        this.exploded = false;
        this.defused = false;
        this.updatingFrame = false;
        this.stone = false;

    }

    
    update(dt)
    {
        this.shouldCallSetPositionsAfterMined = false; 
        super.update(dt);
        if(!this.exploded)
            this.setPositionsAfterMined(4);
        if(this.mined && !this.counting && this.timeLeft > 0)
        {
            this.player.explodingOre = this;
            this.countdown();
        }
        if(this.exploded)
        {
            this.updateFrame();
        }
    }

    render()
    {
        super.render();
    }

    async updateFrame()
    {
        if(!this.updatingFrame)
        {
            this.renderPriority = 110;
            this.position.x -= 15;
            this.position.y -= 20;
            this.updatingFrame = true;
            this.currentFrame = 0;
            this.sprites = this.explosionSprites;
            await timer.addTask(()=> {
                if (this.currentFrame < 7)
                {
                    this.currentFrame++;
                }
            },0.2,1.4, () =>{
                this.cleanUp = true;
            });
        }

    }

    renderCountdown()
    {
        if(this.mined && !this.exploded && !this.defused)
        {
            context.save();
            context.font = '25px small';
            context.fillStyle = this.color;
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillText(`CLICK "Z" TO DEFUSE... ${this.timeLeft}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);
            context.restore();
        }
        if(this.defused)
        {
            context.save();
            context.font = '25px small';
            context.fillStyle = 'green';
            context.textBaseline = 'middle';
            context.textAlign = 'center';
            context.fillText(`Defused!`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 60);
            context.restore();
        }
    }

    
    async countdown()
    {
        this.counting = true;
        await timer.addTask(()=>
        {
            this.color = this.color === "red" ? "black" : "red";
        },
        0.3
        ,6);
        await timer.addTask(()=> {
            if(this.defused === false)
            {
                this.timeLeft--;
                if(this.timeLeft === 1)
                    this.stopHovering = true;
            }
        },
        2,
        6, 
        () =>{
            this.counting = false;
            if(this.defused === false)
            {
                this.exploded = true;
                this.player.health-=2;
            }
            else
            {
                this.cleanUp = true;
            }
        });
    }



}
