class HowToPlayScreen {

    draw() {
        push();
        cursor(ARROW)
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
    }    
}