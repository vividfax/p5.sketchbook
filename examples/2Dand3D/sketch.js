let book;

function setup() {

    createCanvas(500, 500);
    book = new Sketchbook();

    book.newPage();
    book.value.radius = 200;
    book.paper.background(0, 100, 0);

    book.newPage("3D");
    book.value.radius = 0;

    book.run();
}

function draw() {

    book.onPage(0);
    book.value.radius--;
    book.paper.ellipse(100, 100, 100);
    book.paper.rect(book.value.radius, 100, 10);

    book.onPage(1);
    book.value.radius++;
    book.paper.background(0, 0, 225);
    book.paper.sphere(book.value.radius);

    book.draw();
}

function mousePressed() {

    book.next();
}