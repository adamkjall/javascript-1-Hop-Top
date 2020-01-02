class Item extends GameObject {
    private _img: p5.Image;
    private _points: number;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        image: p5.Image,
        score: number,
    ) {
        super(x, y, width, height);
        this._img = image;
        this._points = score;
    }

    public get points(): number {
        return this._points;
    }

    public drawObject(): void {
        push();
        image(
            this._img,
            this.position.x,
            this.position.y,
            this._width,
            this._height
        );
        pop();
    }
}