class Effect extends GameObject {
    private text: string;
    private shift: number = 20;

    constructor(item: Item) {
      super(item.pos.x, item.pos.y, 0, 0);
      this.position = item.pos;
      this.text = '+' + item.getScore().toString();
    }

    public drawObject(): void {
        fill(0);
        text(this.text, this.position.x, this.position.y - this.shift);
        this.shift -= 1;
    }
}

