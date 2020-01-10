"use strict";
function preload() {
    hopTopImage = loadImage("../assets/images/hop_top.png");
    jumpSound = window.loadSound("../assets/sounds/bubbles.wav");
    gameOverSound = window.loadSound("../assets/sounds/game-over.wav");
    newLevelSound = window.loadSound("../assets/sounds/happy-clapps.wav");
    pointsSound = window.loadSound("../assets/sounds/points.wav");
    gameOverMusic = window.loadSound("../assets/sounds/game-over-music.mp3");
    buttonSound = window.loadSound("../assets/sounds/button.wav");
    imgSolid = loadImage("../assets/images/10.png");
    imgFragile = loadImage("../assets/images/1.png");
    imgItemDanger = loadImage("../assets/images/itemDanger.svg");
    imgItemWatermelon = loadImage("../assets/images/itemWatermelon.svg");
    imgAnimated = loadImage("../assets/images/coin.gif");
    imgSpeedBoost = loadImage("../assets/images/star.svg");
    gameOver = loadImage("../assets/images/game_over.png");
    font = loadFont("../assets/font/AmaticSC-Bold.ttf");
}
var font;
var gameOver;
var hopTopImage;
var imgSpeedBoost;
var imgSolid;
var imgFragile;
var imgItemPresent;
var imgItemCandy;
var imgItemCar;
var imgItemDanger;
var imgItemStonefall;
var imgItemWatermelon;
var imgAnimated;
var collectItemSound;
var gameController;
var jumpSound;
var gameOverSound;
var newLevelSound;
var pointsSound;
var gameOverMusic;
var buttonSound;
function setup() {
    createCanvas(600, windowHeight);
    frameRate(60);
    gameController = new GameController();
}
function draw() {
    gameController.update();
    gameController.draw();
}
function windowResized() {
    resizeCanvas(600, windowHeight);
}
var GameObject = (function () {
    function GameObject(x, y, width, height, image) {
        this.position = new Position(x, y);
        this._width = width;
        this._height = height;
        this.image = image;
    }
    GameObject.prototype.draw = function () {
        push();
        image(this.image, this.position.x, this.position.y, this._width, this._height);
        pop();
    };
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () {
            return this._width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () {
            return this._height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "pos", {
        get: function () {
            return this.position;
        },
        set: function (newPosition) {
            this.position = newPosition;
        },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Block = (function (_super) {
    __extends(Block, _super);
    function Block(x, y, width, height, image) {
        if (image === void 0) { image = imgSolid; }
        return _super.call(this, x, y, width, height, image) || this;
    }
    return Block;
}(GameObject));
var CollisionDetection = (function () {
    function CollisionDetection() {
    }
    CollisionDetection.prototype.playerCollidedWithBlock = function (_a, _b) {
        var _c = _a.pos, px = _c.x, py = _c.y, radius = _a.radius;
        var _d = _b.pos, bx = _d.x, by = _d.y, bWidth = _b.width;
        var testX = px;
        var testY = py;
        var aboveTopEdge = false;
        if (px < bx) {
            testX = bx;
        }
        else if (px > bx + bWidth) {
            testX = bx + bWidth;
        }
        if (py < by) {
            testY = by;
            aboveTopEdge = true;
        }
        var distance = dist(px, py, testX, testY);
        if (aboveTopEdge) {
            return distance <= radius;
        }
        else
            return false;
    };
    CollisionDetection.prototype.playerCollidedWithItem = function (_a, _b) {
        var _c = _a.pos, px = _c.x, py = _c.y, radius = _a.radius;
        var _d = _b.pos, bx = _d.x, by = _d.y, bWidth = _b.width, bHeight = _b.height;
        var testX = px;
        var testY = py;
        if (px < bx) {
            testX = bx;
        }
        else if (px > bx + bWidth) {
            testX = bx + bWidth;
        }
        if (py < by) {
            testY = by;
        }
        else if (py > by + bHeight) {
            testY = by + bHeight;
        }
        var distance = dist(px, py, testX, testY);
        return distance <= radius;
    };
    return CollisionDetection;
}());
var FragileBlock = (function (_super) {
    __extends(FragileBlock, _super);
    function FragileBlock(x, y, width, height, image) {
        if (image === void 0) { image = imgFragile; }
        var _this = _super.call(this, x, y, width, height, image) || this;
        _this._isDestroyed = false;
        return _this;
    }
    FragileBlock.prototype.destroy = function () {
        this._isDestroyed = true;
    };
    Object.defineProperty(FragileBlock.prototype, "isDestroyed", {
        get: function () {
            return this._isDestroyed;
        },
        enumerable: true,
        configurable: true
    });
    return FragileBlock;
}(GameObject));
var GameController = (function () {
    function GameController(showStartScreen) {
        var _this = this;
        if (showStartScreen === void 0) { showStartScreen = true; }
        this.isPlayerDead = function () {
            return _this.player.pos.y > height + _this.player.radius * 2;
        };
        this.score = 0;
        var localStorageHighscore = localStorage.getItem("highscore");
        var highscoreObj = localStorageHighscore
            ? JSON.parse(localStorageHighscore)
            : {};
        var highscoreArray = Object.keys(highscoreObj).map(function (key) { return highscoreObj[key]; });
        this.highScore = highscoreArray.length ? Math.max.apply(Math, highscoreArray) : 0;
        this.levelNumber = 1;
        this.levelFactory = new LevelFactory();
        this.level = this.levelFactory.createLevel(this.levelNumber);
        this.player = new Player(width / 2, height - 100);
        this.collisionDetection = new CollisionDetection();
        this.isStartingNextLevel = false;
        this.countDown = 5;
        this.isStartGame = showStartScreen;
        this.isGameOver = false;
        this.startScreen = showStartScreen ? new StartScreen() : undefined;
        this.scoreboard = new Scoreboard();
        this.isHowToplay = false;
        this.howToPlayScreen = new HowToPlayScreen();
    }
    GameController.prototype.update = function () {
        var _this = this;
        if (this.isStartGame && keyIsPressed && keyCode === 13) {
            removeElements();
            this.isStartGame = false;
        }
        if (this.isStartGame && !this.isHowToplay && keyIsPressed && keyCode === 72) {
            removeElements();
            this.isStartGame = false;
            this.isHowToplay = true;
        }
        else if (this.isHowToplay && !this.isStartGame && keyIsPressed && keyCode === 27) {
            removeElements();
            this.isHowToplay = false;
            this.isStartGame = true;
            this.startScreen = new StartScreen;
        }
        if (this.isPlayerDead()) {
            if (!this.isGameOver) {
                this.saveHighscore();
                gameOverMusic.play();
                this.gameOverScreen = new GameOverScreen(this.score);
            }
            this.isGameOver = true;
        }
        if (this.isStartGame || this.isHowToplay || this.isGameOver)
            return;
        gameOverMusic.stop();
        if (this.level.levelProgress >= 100 && !this.isStartingNextLevel) {
            this.startNextLevel();
        }
        this.player.move();
        var heightBeforeGameStarts = height / 2;
        if (this.player.pos.y < heightBeforeGameStarts ||
            this.level.levelProgress > 0) {
            this.level.updateLevel();
        }
        this.level.updateEffects();
        this.level.levelObjects.forEach(function (levelObject) {
            var isblockCollision = _this.collisionDetection.playerCollidedWithBlock(_this.player, levelObject);
            var isItemCollision = _this.collisionDetection.playerCollidedWithItem(_this.player, levelObject);
            if (isblockCollision) {
                if (levelObject instanceof Block) {
                    var didBounce = _this.player.bounceOnBlock(levelObject.pos);
                    if (didBounce)
                        jumpSound.play();
                }
                else if (levelObject instanceof FragileBlock) {
                    if (!levelObject.isDestroyed) {
                        var didBounce = _this.player.bounceOnBlock(levelObject.pos);
                        if (didBounce)
                            levelObject.destroy();
                    }
                }
            }
            else if (isItemCollision) {
                if (levelObject instanceof SpeedBoost) {
                    levelObject.applySpeedBoost(_this.player);
                    _this.level.pickUpItem(levelObject);
                    _this.updateScore(levelObject.points);
                }
                else if (levelObject instanceof Item) {
                    _this.level.pickUpItem(levelObject);
                    _this.updateScore(levelObject.points);
                }
            }
        });
    };
    GameController.prototype.draw = function () {
        if (this.isStartGame && this.startScreen) {
            gameOverMusic.stop();
            this.startScreen.draw();
            return;
        }
        if (this.isHowToplay) {
            this.howToPlayScreen.draw();
            return;
        }
        if (this.isGameOver && this.gameOverScreen) {
            this.gameOverScreen.draw();
            return;
        }
        this.level.drawLevel();
        this.scoreboard.draw(this.score, this.highScore, this.levelNumber);
        this.player.drawPlayer();
        if (this.isStartingNextLevel)
            this.displayCountdown();
    };
    GameController.prototype.saveHighscore = function () {
        var localStorageName = localStorage.getItem("name");
        var playerName = localStorageName
            ? JSON.parse(localStorageName)
            : undefined;
        if (playerName) {
            var localStorageHighscore = localStorage.getItem("highscore");
            var highscore = localStorageHighscore
                ? JSON.parse(localStorageHighscore)
                : {};
            if (highscore[playerName] && highscore[playerName] < this.score) {
                highscore[playerName] = this.score;
            }
            else if (!highscore[playerName]) {
                highscore[playerName] = this.score;
            }
            localStorage.setItem("highscore", JSON.stringify(highscore));
        }
    };
    GameController.prototype.startNextLevel = function () {
        var _this = this;
        newLevelSound.play();
        this.isStartingNextLevel = true;
        setTimeout(function () {
            var newLevel = (_this.levelNumber + 1) % 6;
            if (newLevel === 0)
                newLevel = 1;
            _this.levelNumber = newLevel;
            _this.player.pos = new Position(width / 2, height - 100);
            _this.level = _this.levelFactory.createLevel(_this.levelNumber);
            _this.isStartingNextLevel = false;
        }, 5000);
        var nextLevelTimer = setInterval(function () {
            if (_this.countDown < 1) {
                _this.countDown = 5;
                clearInterval(nextLevelTimer);
            }
            else
                _this.countDown -= 1;
        }, 1000);
    };
    GameController.prototype.displayCountdown = function () {
        push();
        textAlign(CENTER);
        stroke("rgb(255,171,194)");
        strokeWeight(7);
        textStyle(BOLD);
        textSize(42);
        fill(32);
        text("Next level in " + this.countDown, width / 2, height / 4);
        pop();
    };
    GameController.prototype.updateScore = function (itemScore) {
        pointsSound.play();
        this.score += itemScore;
    };
    return GameController;
}());
var GameOverScreen = (function () {
    function GameOverScreen(playerScore) {
        this.playerScore = playerScore;
        this.highscoreList = this.getTop5Scores();
    }
    GameOverScreen.prototype.getTop5Scores = function () {
        var localStorageHighscore = localStorage.getItem("highscore");
        var highscoreObj = localStorageHighscore
            ? JSON.parse(localStorageHighscore)
            : {};
        var highscoreArray = Object.keys(highscoreObj).map(function (key) { return ({
            name: key,
            score: Number(highscoreObj[key])
        }); });
        var sortedArray = highscoreArray.sort(function (a, b) { return b.score - a.score; });
        var top5 = sortedArray.slice(0, 5);
        return top5;
    };
    GameOverScreen.prototype.draw = function () {
        if (!this.playButton && !this.quitButton) {
            push();
            this.playButton = createButton("PLAY AGAIN?");
            this.playButton.position(windowWidth / 2 - width / 2 + width * 0.25, height * 0.82);
            this.playButton.style("background-color", "rgb(252, 208, 107)");
            this.playButton.style('font-family', 'AmaticSC-Bold');
            this.playButton.style("font-size", "1.7rem");
            this.playButton.style("color", "rgb(38,48,86)");
            this.playButton.style("border-radius", "2rem");
            this.playButton.style("padding", "1rem");
            this.playButton.style("border", "none");
            this.playButton.style("outline", "none");
            this.playButton.mousePressed(this.restartGame);
            this.quitButton = createButton("QUIT GAME");
            this.quitButton.position(windowWidth / 2 + width / 2 - width * 0.25, height * 0.82);
            this.quitButton.style("background-color", "rgb(38,48,86)");
            this.quitButton.style('font-family', 'AmaticSC-Bold');
            this.quitButton.style("font-size", "1.7rem");
            this.quitButton.style("color", "rgb(252, 208, 107)");
            this.quitButton.style("border-radius", "2rem");
            this.quitButton.style("padding", "1rem");
            this.quitButton.style("border", "none");
            this.quitButton.style("outline", "none");
            this.quitButton.style("transform", "translateX(-100%)");
            this.quitButton.mousePressed(this.quitGame);
            pop();
        }
        push();
        background(172, 184, 229, 245);
        textAlign(CENTER);
        fill("rgb(255, 171, 194)");
        stroke("rgb(38,48,86)");
        strokeWeight(12);
        noCursor();
        ellipse(mouseX, mouseY, 30, 30);
        image(gameOver, 175, 35);
        gameOver.resize(240, 180);
        pop();
        this.displayHighscoreList();
    };
    GameOverScreen.prototype.displayHighscoreList = function () {
        push();
        textFont(font);
        fill(255);
        textAlign(CENTER);
        textSize(52);
        fill(252, 208, 107);
        text("Your score: " + this.playerScore, width / 2, height * 0.40);
        fill(245, 88, 131);
        text("Highscore", width / 2, height * 0.49);
        fill(255, 255, 255);
        textSize(42);
        text("Name", width / 2 - 100, height * 0.57);
        text("Score", width / 2 + 100, height * 0.57);
        textSize(30);
        textAlign(CENTER);
        this.highscoreList.forEach(function (highscore, i) {
            var offset = 30;
            fill(38, 48, 86);
            text(highscore.name, width / 2 - 100, height * 0.62 + offset * i);
            text(highscore.score, width / 2 + 100, height * 0.62 + offset * i);
        });
        pop();
    };
    GameOverScreen.prototype.restartGame = function () {
        buttonSound.play();
        removeElements();
        gameController = new GameController(false);
    };
    GameOverScreen.prototype.quitGame = function () {
        buttonSound.play();
        removeElements();
        gameController = new GameController();
    };
    return GameOverScreen;
}());
var HowToPlayScreen = (function () {
    function HowToPlayScreen() {
    }
    HowToPlayScreen.prototype.draw = function () {
        push();
        cursor(ARROW);
        textFont(font);
        background("#acb8e5");
        fill("white");
        textAlign(CENTER);
        textSize(30);
        text("Welcome to Hop to the Top!", width / 2, height * 0.20);
        text("The point of this game is to get the", width / 2, height * 0.35);
        text("ball as far up to the top as possible.", width / 2, height * 0.40);
        text("Along the way you will encounter several", width / 2, height * 0.45);
        text("different objects, some give you points", width / 2, height * 0.50);
        text("and others remove points. To steer the ball", width / 2, height * 0.55);
        text("use the left and right arrow on your keyboard.", width / 2, height * 0.60);
        text("Good luck!", width / 2, height * 0.65);
        text("press esc", width / 1.2, height * 0.91);
        text("to go back", width / 1.2, height * 0.95);
        pop();
    };
    return HowToPlayScreen;
}());
var Item = (function (_super) {
    __extends(Item, _super);
    function Item(x, y, width, height, image, points) {
        var _this = _super.call(this, x, y, width, height, image) || this;
        _this._points = points;
        return _this;
    }
    Object.defineProperty(Item.prototype, "points", {
        get: function () {
            return this._points;
        },
        enumerable: true,
        configurable: true
    });
    return Item;
}(GameObject));
var Level = (function () {
    function Level(gameObjects, startColor, endColor) {
        this._levelProgress = 0;
        this._levelObjects = gameObjects;
        this.pointsAnimation = [];
        this.isLevelDone = false;
        this.speed = 3.25;
        this.startColor = startColor;
        this.endColor = endColor;
    }
    Level.prototype.updateLevel = function () {
        this.isLevelDone = this.checkIfLevelIsDone();
        if (this.isLevelDone) {
            this._levelProgress = 100;
            return;
        }
        var mapLength = this.levelObjects.length - 10;
        var progressStep = 100 / mapLength;
        var numberOfBlocksPassed = 0;
        for (var _i = 0, _a = this._levelObjects; _i < _a.length; _i++) {
            var obj = _a[_i];
            obj.pos.y += this.speed;
            if (obj instanceof Block && obj.pos.y >= height) {
                numberOfBlocksPassed++;
                this._levelProgress = numberOfBlocksPassed * progressStep;
            }
        }
    };
    Level.prototype.updateEffects = function () {
        for (var _i = 0, _a = this.pointsAnimation; _i < _a.length; _i++) {
            var effect = _a[_i];
            effect.move();
        }
    };
    Level.prototype.drawLevel = function () {
        var _this = this;
        var startColorStr = this.startColor.toString();
        var endColorStr = this.endColor.toString();
        var startColorArr = startColorStr.slice(5, str.length - 3).split(",");
        var endColorArr = endColorStr.slice(5, str.length - 3).split(",");
        var startR = Number(startColorArr[0]);
        var startG = Number(startColorArr[1]);
        var startB = Number(startColorArr[2]);
        var endR = Number(endColorArr[0]);
        var endG = Number(endColorArr[1]);
        var endB = Number(endColorArr[2]);
        var r = map(this.levelProgress, 0, 100, startR, endR);
        var g = map(this.levelProgress, 0, 100, startG, endG);
        var b = map(this.levelProgress, 0, 100, startB, endB);
        background(r, g, b);
        for (var _i = 0, _a = this._levelObjects; _i < _a.length; _i++) {
            var object = _a[_i];
            if (object instanceof FragileBlock) {
                if (!object.isDestroyed)
                    object.draw();
            }
            else {
                object.draw();
            }
        }
        this.pointsAnimation.forEach(function (effect, i) {
            effect.draw();
            if (effect.pos.y >= height)
                _this.pointsAnimation.splice(i, 1);
        });
        var cloudPosY = this.levelObjects[0].pos.y;
        this.createCloud(cloudPosY);
    };
    Level.prototype.createCloud = function (y) {
        var circleSize = 90;
        var gridOfCloud = width / 8;
        push();
        fill(200, 150, 255);
        noStroke();
        circle(0 * gridOfCloud, y + 20, circleSize);
        circle(1 * gridOfCloud, y, circleSize);
        circle(2 * gridOfCloud, y - 10, circleSize);
        circle(3 * gridOfCloud, y - 15, circleSize);
        circle(4 * gridOfCloud, y + 10, circleSize);
        circle(5 * gridOfCloud, y - 20, circleSize);
        circle(6 * gridOfCloud, y - 10, circleSize);
        circle(7 * gridOfCloud, y + 10, circleSize);
        circle(8 * gridOfCloud, y - 10, circleSize);
        if (width > 460) {
            circle(0.5 * gridOfCloud, y + 5, circleSize);
            circle(1.5 * gridOfCloud, y - 10, circleSize);
            circle(2.5 * gridOfCloud, y + 10, circleSize);
            circle(3.5 * gridOfCloud, y + 5, circleSize);
            circle(4.5 * gridOfCloud, y - 10, circleSize);
            circle(5.5 * gridOfCloud, y + 10, circleSize);
            circle(6.5 * gridOfCloud, y - 10, circleSize);
            circle(7.5 * gridOfCloud, y + 10, circleSize);
        }
        pop();
    };
    Level.prototype.checkIfLevelIsDone = function () {
        var lastObject = this.levelObjects[this.levelObjects.length - 1];
        return lastObject.pos.y >= height - 300;
    };
    Level.prototype.pickUpItem = function (objectToRemove) {
        this._levelObjects = this.levelObjects.filter(function (object) { return object !== objectToRemove; });
        var pickUpEffect = new PointsAnimation(objectToRemove.pos, objectToRemove.points);
        this.pointsAnimation.push(pickUpEffect);
    };
    Object.defineProperty(Level.prototype, "levelObjects", {
        get: function () {
            return this._levelObjects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Level.prototype, "levelProgress", {
        get: function () {
            return this._levelProgress;
        },
        enumerable: true,
        configurable: true
    });
    return Level;
}());
var LevelFactory = (function () {
    function LevelFactory() {
    }
    LevelFactory.prototype.createLevel = function (level) {
        switch (level) {
            case 1:
                return this.levelOne();
            case 2:
                return this.levelTwo();
            case 3:
                return this.levelThree();
            case 4:
                return this.levelFour();
            case 5:
                return this.levelFive();
            default:
                return this.levelOne();
        }
    };
    LevelFactory.prototype.createLevelObject = function (levelMap) {
        var levelObjects = [];
        var xStepSize = width / levelMap[0].length;
        for (var y = 0; y < levelMap.length; y++) {
            for (var x = 0; x < levelMap[0].length; x++) {
                var cell = levelMap[levelMap.length - 1 - y][x];
                var xPos = x * xStepSize;
                var yPos = y * -100 + height;
                var object = void 0;
                switch (cell) {
                    case 1:
                        object = new FragileBlock(xPos, yPos, xStepSize, 20);
                        break;
                    case 2:
                        object = new Block(xPos, yPos, xStepSize, 20);
                        break;
                    case 3:
                        object = new Item(x * xStepSize, y * -100 + height, xStepSize, xStepSize, imgItemWatermelon, 30);
                        break;
                    case 4:
                        object = new SpeedBoost(x * xStepSize, y * -100 + height, xStepSize, xStepSize, 50);
                        break;
                    case 5:
                        object = new Item(xPos, yPos, xStepSize, xStepSize, imgItemDanger, -50);
                        break;
                    case 6:
                        object = new Item(xPos, yPos, xStepSize, xStepSize, imgAnimated, 15);
                        break;
                }
                if (object)
                    levelObjects.push(object);
            }
        }
        return levelObjects;
    };
    LevelFactory.prototype.levelOne = function () {
        var levelMap = [
            [2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 6, 0],
            [0, 0, 0, 0, 0, 0, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2],
            [0, 3, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 2],
            [4, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 6, 0],
            [0, 0, 0, 0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0],
            [0, 6, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 3],
            [0, 0, 0, 0, 0, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 0, 0],
            [0, 5, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 0, 0, 0],
            [3, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 0, 0],
            [6, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2]
        ];
        var gameObjects = this.createLevelObject(levelMap);
        var startColor = color(120, 170, 235);
        var endColor = color(50, 120, 220);
        return new Level(gameObjects, startColor, endColor);
    };
    LevelFactory.prototype.levelTwo = function () {
        var levelMap = [
            [2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 1, 0],
            [0, 5, 0, 0, 0, 0, 0, 0],
            [0, 1, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 6, 0],
            [0, 0, 0, 0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 3, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 6, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 5, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 2, 2, 0],
            [6, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 4, 0, 0],
            [0, 0, 0, 0, 2, 2, 2, 0],
            [0, 6, 0, 0, 0, 0, 0, 0],
            [2, 1, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 2],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2]
        ];
        var gameObjects = this.createLevelObject(levelMap);
        var startColor = color(50, 120, 220);
        var endColor = color(225, 60, 230);
        return new Level(gameObjects, startColor, endColor);
    };
    LevelFactory.prototype.levelThree = function () {
        var levelMap = [
            [2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 6, 0, 0, 0],
            [0, 0, 0, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [4, 0, 0, 0, 5, 0, 0, 0],
            [1, 2, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 6, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 6, 0],
            [0, 0, 0, 0, 2, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 0, 0],
            [0, 6, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 3],
            [0, 0, 0, 0, 0, 0, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 0, 0, 0, 0],
            [3, 5, 3, 5, 3, 5, 3, 5],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 6, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 6, 0, 0, 0, 0, 0],
            [0, 0, 1, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 5],
            [0, 0, 0, 0, 0, 0, 2, 2],
            [4, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 5],
            [0, 0, 1, 0, 0, 2, 2, 2],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 2, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 6, 0, 0, 0, 0, 7, 0],
            [0, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0],
            [0, 1, 1, 0, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0],
            [0, 0, 0, 3, 0, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0],
            [2, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2]
        ];
        var gameObjects = this.createLevelObject(levelMap);
        var startColor = color(225, 60, 230);
        var endColor = color(250, 240, 65);
        return new Level(gameObjects, startColor, endColor);
    };
    LevelFactory.prototype.levelFour = function () {
        var levelMap = [
            [2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 5, 0, 0],
            [0, 6, 0, 0, 6, 6, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 3],
            [0, 0, 0, 0, 0, 0, 2, 2],
            [0, 0, 5, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 6, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 5, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 0, 0, 0, 0, 3, 0],
            [0, 0, 6, 0, 0, 0, 1, 0],
            [0, 0, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1],
            [4, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 5],
            [0, 0, 0, 0, 0, 2, 1, 2],
            [0, 6, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 2, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 2, 2, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 5, 0],
            [0, 0, 0, 0, 0, 2, 1, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2]
        ];
        var gameObjects = this.createLevelObject(levelMap);
        var startColor = color(250, 240, 65);
        var endColor = color(115, 240, 125);
        return new Level(gameObjects, startColor, endColor);
    };
    LevelFactory.prototype.levelFive = function () {
        var levelMap = [
            [2, 2, 2, 2, 2, 2, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 0, 0],
            [0, 3, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 2, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 2, 0, 0, 0, 0],
            [7, 8, 7, 11, 7, 11, 7, 8],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 6, 0, 3, 0, 6, 0, 3],
            [0, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 6, 5],
            [0, 0, 6, 0, 0, 2, 2, 0],
            [0, 0, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 9, 0, 0],
            [0, 0, 9, 0, 2, 2, 0, 0],
            [0, 2, 1, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 11, 0, 0],
            [0, 0, 0, 0, 0, 1, 2, 2],
            [0, 4, 0, 7, 0, 0, 0, 0],
            [0, 1, 2, 0, 0, 0, 0, 0],
            [6, 0, 6, 0, 6, 0, 6, 0],
            [0, 0, 0, 0, 0, 2, 2, 0],
            [0, 0, 0, 5, 0, 0, 0, 0],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 11, 0],
            [0, 0, 0, 0, 0, 2, 2, 2],
            [0, 0, 0, 3, 3, 3, 0, 0],
            [0, 0, 0, 2, 2, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [5, 6, 4, 0, 1, 0, 0, 0],
            [2, 2, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 2, 1, 0, 0],
            [0, 0, 0, 6, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 8, 5],
            [0, 0, 0, 11, 0, 2, 2, 2],
            [0, 0, 0, 1, 2, 0, 0, 0],
            [0, 6, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 2, 0],
            [0, 0, 0, 11, 0, 0, 0, 0],
            [0, 0, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [2, 2, 2, 2, 2, 2, 2, 2]
        ];
        var gameObjects = this.createLevelObject(levelMap);
        var startColor = color(115, 240, 125);
        var endColor = color(120, 170, 235);
        return new Level(gameObjects, startColor, endColor);
    };
    return LevelFactory;
}());
var Player = (function () {
    function Player(x, y, xVelocity, yVelocity, speed, diameter) {
        if (xVelocity === void 0) { xVelocity = 0; }
        if (yVelocity === void 0) { yVelocity = 0; }
        if (speed === void 0) { speed = 0.6; }
        if (diameter === void 0) { diameter = 65; }
        this.bouncePower = 16.5;
        this._maxSpeed = 8;
        this.color = color(38, 48, 86);
        this.borderColor = color(255, 171, 194);
        this.history = [];
        this.position = new Position(x, y);
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this._speed = speed;
        this.diameter = diameter;
    }
    Player.prototype.move = function () {
        if (keyIsDown(RIGHT_ARROW)) {
            if (this.xVelocity >= this._maxSpeed)
                this.xVelocity = this._maxSpeed;
            else
                this.xVelocity += this._speed;
        }
        else if (keyIsDown(LEFT_ARROW)) {
            if (abs(this.xVelocity) >= this._maxSpeed)
                this.xVelocity = -this._maxSpeed;
            else
                this.xVelocity -= this._speed;
        }
        this.history.length > 5 ? this.history.shift() : null;
        var v = createVector(this.pos.x, this.pos.y);
        this.history.push(v);
        this.position.x += this.xVelocity;
        this.position.y += this.yVelocity;
        this.gravity();
        this.xVelocity *= 0.95;
        var collisionWithRightWall = this.position.x > width - this.diameter / 2;
        var collisionWithLeftWall = this.position.x < this.diameter / 2;
        if (collisionWithRightWall) {
            this.position.x = width - this.diameter / 2;
            this.xVelocity = -this.xVelocity * 0.8;
        }
        else if (collisionWithLeftWall) {
            this.position.x = this.diameter / 2;
            this.xVelocity = -this.xVelocity * 0.8;
        }
    };
    Player.prototype.bounceOnBlock = function (pos) {
        if (this.yVelocity > 0) {
            this.pos.y = pos.y - this.radius - 1;
            this.yVelocity = 0;
            this.yVelocity -= this.bouncePower;
            return true;
        }
        return false;
    };
    Player.prototype.gravity = function () {
        this.yVelocity += 0.7;
    };
    Player.prototype.drawPlayer = function () {
        push();
        for (var i = 0; i < this.history.length; i++) {
            var v = this.history[i];
            noStroke();
            this.borderColor.setAlpha(40);
            fill(this.borderColor);
            circle(v.x, v.y, this.radius * 2 * (i / this.history.length));
        }
        this.borderColor.setAlpha(255);
        stroke(this.borderColor);
        var outerCircleSize = this.diameter / 3.5;
        strokeWeight(outerCircleSize);
        fill(this.color);
        circle(this.position.x, this.position.y, this.diameter - outerCircleSize);
        pop();
    };
    Player.prototype.changeColor = function (color, borderColor) {
        var oldColor = this.color;
        var oldBorderColor = this.borderColor;
        this.color = color;
        this.borderColor = borderColor;
        return [oldColor, oldBorderColor];
    };
    Object.defineProperty(Player.prototype, "pos", {
        get: function () {
            return this.position;
        },
        set: function (pos) {
            this.position = pos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "radius", {
        get: function () {
            return this.diameter / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (newSpeed) {
            this._speed = newSpeed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "maxSpeed", {
        get: function () {
            return this._maxSpeed;
        },
        set: function (newMaxSpeed) {
            this._maxSpeed = newMaxSpeed;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());
var PointsAnimation = (function () {
    function PointsAnimation(pos, points) {
        this._pos = pos;
        this.points = points;
        this.gravity = 0.2;
        this.velocity = createVector(random(-1, 1), -2);
    }
    PointsAnimation.prototype.draw = function () {
        var str = this.points > 0 ? "+" + this.points : this.points;
        var color = this.points < 0 ? "red" : "yellow";
        push();
        fill(color);
        stroke("black");
        strokeWeight(5);
        textSize(24);
        var offset = 20;
        text(str, this._pos.x + offset, this._pos.y + offset);
        pop();
    };
    PointsAnimation.prototype.move = function () {
        this._pos.y += this.velocity.y;
        this._pos.x += this.velocity.x;
        this.velocity.y += this.gravity;
    };
    Object.defineProperty(PointsAnimation.prototype, "pos", {
        get: function () {
            return this._pos;
        },
        set: function (newPos) {
            this._pos = newPos;
        },
        enumerable: true,
        configurable: true
    });
    return PointsAnimation;
}());
var Position = (function () {
    function Position(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Position.prototype, "x", {
        get: function () {
            return this._x;
        },
        set: function (newX) {
            this._x = newX;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Position.prototype, "y", {
        get: function () {
            return this._y;
        },
        set: function (newY) {
            this._y = newY;
        },
        enumerable: true,
        configurable: true
    });
    return Position;
}());
var Scoreboard = (function () {
    function Scoreboard() {
    }
    Scoreboard.prototype.draw = function (score, highscore, level) {
        this.drawBoard();
        this.drawText();
        this.drawPoints(score, highscore, level);
    };
    Scoreboard.prototype.drawText = function () {
        push();
        textFont(font);
        fill(0, 10, 153);
        textSize(22);
        text("Level", 285, 35);
        text("High Score", 85, 55);
        text("Score", 430, 55);
        pop();
    };
    Scoreboard.prototype.drawPoints = function (score, highscore, level) {
        push();
        fill(255, 255, 255);
        textSize(18);
        text(highscore, 90, 75);
        text(score, 430, 75);
        textSize(62);
        textAlign(CENTER);
        text(level, 300, 90);
        pop();
    };
    Scoreboard.prototype.drawBoard = function () {
        push();
        var c = color(252, 208, 107);
        stroke(c);
        fill(c);
        circle(300, 60, 100);
        strokeWeight(50);
        line(75, 60, 525, 60);
        pop();
    };
    return Scoreboard;
}());
var SpeedBoost = (function (_super) {
    __extends(SpeedBoost, _super);
    function SpeedBoost(x, y, width, height, points, image) {
        if (points === void 0) { points = 50; }
        if (image === void 0) { image = imgSpeedBoost; }
        var _this = _super.call(this, x, y, width, height, image, points) || this;
        _this.speed = 1.2;
        _this.maxSpeed = 10;
        _this.duration = 5000;
        return _this;
    }
    SpeedBoost.prototype.applySpeedBoost = function (player) {
        var oldSpeed = player.speed;
        var oldMaxSpeed = player.maxSpeed;
        var newColor = color(59, 69, 107);
        var newBorderColor = color(248, 122, 156);
        var _a = player.changeColor(newColor, newBorderColor), oldColor = _a[0], oldBorderColor = _a[1];
        player.speed = this.speed;
        player.maxSpeed = this.maxSpeed;
        var interval1 = setInterval(function () {
            player.changeColor(oldColor, oldBorderColor);
        }, 200);
        var interval2 = setInterval(function () {
            player.changeColor(newColor, newBorderColor);
        }, 400);
        setTimeout(function () {
            player.speed = oldSpeed;
            player.maxSpeed = oldMaxSpeed;
            clearInterval(interval1);
            clearInterval(interval2);
            player.changeColor(oldColor, oldBorderColor);
        }, this.duration);
    };
    return SpeedBoost;
}(Item));
var StartScreen = (function () {
    function StartScreen() {
        this.initInput();
    }
    StartScreen.prototype.initInput = function () {
        var localStorageName = localStorage.getItem("name");
        var playerName = localStorageName ? JSON.parse(localStorageName) : "Player 1";
        var input = createInput();
        input.value(playerName);
        input.style("font-size", "24px");
        input.style("text-align", "center");
        input.style("background", "#8090CC");
        input.style("border-radius", "5px");
        input.style("outline", "none");
        input.style("border", "none");
        input.style("color", "white");
        input.elt.focus();
        input.position(0, height * 0.8);
        input.center("horizontal");
        window.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                localStorage.setItem("name", JSON.stringify(input.value()));
            }
        });
        return input;
    };
    StartScreen.prototype.draw = function () {
        push();
        cursor(ARROW);
        textFont(font);
        background("#acb8e5");
        imageMode(CENTER);
        image(hopTopImage, width / 2, height * 0.45, width * 0.75);
        fill("white");
        textAlign(CENTER);
        textSize(30);
        text("press enter to", width / 3, height * 0.91);
        text("start the game", width / 3, height * 0.95);
        text("press h for", width / 1.5, height * 0.91);
        text("how to play", width / 1.5, height * 0.95);
        pop();
    };
    return StartScreen;
}());
//# sourceMappingURL=bundle.js.map