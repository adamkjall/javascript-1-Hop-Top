class StartScreen {

  constructor() {
    this.initInput();
  }

  initInput() {
    const localStorageName = localStorage.getItem("name");
    const playerName : string = localStorageName ? JSON.parse(localStorageName) : "Player 1";

    const input = createInput();
    input.value(playerName)
    // input.style("font-family", "Amatic SC");
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

    window.addEventListener("keypress", (e: any) => {
      if (e.key === "Enter") {
        localStorage.setItem("name", JSON.stringify(input.value()));
        
      }
    });

    return input;
  }

  draw() {
    push();
    cursor(ARROW)
    textFont(font);
    background("#acb8e5");
    imageMode(CENTER);
    image(hopTopImage, width / 2, height * 0.45, width * 0.75);

    fill("white");
    textAlign(CENTER);

    textSize(30);
    text("press enter to", width / 2, height * 0.91);
    text("start the game", width / 2, height * 0.95);
    pop();
  }
}
