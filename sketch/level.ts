class level {
    // private highScoreAnimation: animation;
    private maxBlockWidth: number;
    private minBlockWidth: number;
    private levelProgress: number;

    constructor(
        // highScoreAnimation: animation;
        maxBlockwidth: number,
        minBlockWidth: number,
    ) {
        this.maxBlockWidth = maxBlockwidth;
        this.minBlockWidth = minBlockWidth;
        this.levelProgress = 0

    }


    public isLevelDone(): Boolean {
        return true;
    }


    public updateLevel(): void {};

    public drawLevel(): void {};

    // public removeItem(item:item): void {}
}
