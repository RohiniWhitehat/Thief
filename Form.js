class Form{
    constructor(){
        this.title = createElement('h2')
    }
    hide(){
        this.title.hide();
    }
    display(){
        this.title.html("Catch the thief");
        this.title.position(550,100);
        this.title.style('font-size','40px');
    }
}