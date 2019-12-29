class Effect extends GameObject {
    private text: string;
    private shift: number = 20;

    constructor(item: Item) {
      super(item.pos.x, item.pos.y, 0, 0);
      this.text = '+' + item.getScore().toString();
    }

    public drawObject(): void {
        push();
        fill("yellow");
        stroke("black");
        strokeWeight(5);
        textAlign(CENTER);
        textSize(24);
        text(this.text, this.position.x, this.position.y - this.shift);
        this.shift -= 1;
        pop();
    }
}

