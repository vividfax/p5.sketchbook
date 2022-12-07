// https://editor.p5js.org/vividfax/sketches/_90HBjAcd

let book;

function setup() {

    createCanvas(500, 500);
    book = new Sketchbook();

    book.newPage();
    book.value.radius = 200;
    book.paper.background("#66A182");

    book.newPage("3D");
    book.value.radius = 0;
    book.value.backgroundColour = "#2E4057";

    book.run();
}

function draw() {

    let currentPageIndex = book.getPage();

    if (currentPageIndex == 0) {
        book.onPage(0);
        book.value.radius--;
        book.paper.ellipse(100, 100, book.value.radius);

    } else if (currentPageIndex == 1) {
        book.onPage(1);
        book.value.radius++;
        book.paper.clear();
        book.paper.background(book.value.backgroundColour);
        book.paper.sphere(book.value.radius);
    }

    book.draw();
}

function keyPressed() {

    if (keyCode === LEFT_ARROW) {
        book.previous();
    } else if (keyCode === RIGHT_ARROW) {
        book.next();
    } else if (keyCode === ENTER) {
        book.reset();
    }
}