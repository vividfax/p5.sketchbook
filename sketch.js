let book;

function setup() {

    createCanvas(500, 500);
    book = new Sketchbook();

    book.newPage(); // red
    book.paper.background(100, 0, 0);

    book.newPage(); // green
    book.paper.background(0, 100, 0);
    book.value.radius = 200;

    book.newPage("3D"); // blue
    book.paper.background(0, 0, 225);
    book.value.radius = 0;

    book.run();
    // book.viewPage(1);
}

function draw() {

    book.onPage(1); // green
    book.value.radius--;
    book.paper.ellipse(100, 100, 100);
    book.paper.rect(book.value.radius, 100, 10);

    book.onPage(2); // blue
    book.paper.background(0, 0, 225);
    book.value.radius++;
    book.paper.sphere(book.value.radius);

    book.draw();
}

function mousePressed() {

    book.next();
    // book.reset();
}