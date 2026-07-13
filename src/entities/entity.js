export class Entity{

    constructor(view, options = {}){
        
        this.container = new PIXI.Container()
        this.view = view
        this.container.addChild(this.view)

        this.x = 0
        this.y = 0

        this.width = options.width ?? 12;
        this.height = options.height ?? 18;

        this.hitboxOffset = options.hitboxOffset ?? {x: 0, y: 0};
    }

    updateTransform(){
        this.container.x = this.x
        this.container.y = this.y
        this.container.zIndex = this.container.y
    }

    getBounds(x = this.x, y = this.y) {
        return {
            x: x + this.hitboxOffset.x - this.width / 2, //este en realidad seria lo ideal que el sprite este centrado, pero por ahora
            y: y + this.hitboxOffset.y - this.height / 2,
            width: this.width,
            height: this.height
        };
    }

    //no quiero pensar, voy a ver que hago despues, esto solo lo tengo para obtener el rango del collider para los trigger.
    getBoundsWithOffset(width, height, offset = {x: 0, y: 0}, x = this.x, y = this.y){
        return {
            x: x + offset.x,
            y: y + offset.y,
            width,
            height
        };
    }
}