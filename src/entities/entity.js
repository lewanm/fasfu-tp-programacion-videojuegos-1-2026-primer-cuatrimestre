export class Entity{

    constructor(view){
        
        this.view = view

        this.x = 0
        this.y = 0
    }

    updateTransform(){
        this.view.x = this.x
        this.view.y = this.y
    }
}