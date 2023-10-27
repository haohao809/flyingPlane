import { _decorator, Component, Node, resources, SpriteFrame,Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {
    isDead: boolean = false;
    airplaneDeadImages = [];
    start() {
        this.loadImages()
    }

    update(deltaTime: number) {
        if(this.isDead) return;
        const { x, y } = this.node.getPosition();
        const moveY = y - 500 * deltaTime;
        this.node.setPosition(x, moveY);
        if (moveY < -900) { 
            this.node.destroy();
        }
        
    }

    die() {
        if(this.isDead) return;
        this.isDead = true;
        this.playDead();
        setTimeout(() => {
            this.node?.destroy?.();
        },300);
    }

    loadImages() {
        resources.loadDir(
            "enemy-death",
            SpriteFrame,
            (err, spirteFrames) => {
                this.airplaneDeadImages = spirteFrames
            }
        )
    }

    playDead() {
        for(let i = 0; i < this.airplaneDeadImages.length; i++) {
            setTimeout(() => {
                if (this.node?.getComponent) {
                    this.node.getComponent(Sprite).spriteFrame = this.airplaneDeadImages[i];
                }
            }, i*80)
        }
    }
}


