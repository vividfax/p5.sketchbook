# p5.sketchbook

Create and manage multiple [p5.js](https://p5js.org/) sketches in one canvas. Useful for sketch compliations and things like [Genuary](https://genuary.art/).

## How to use

### Include it in the .html

    <head>
        <script src="libraries/sketchbook.js"></script>
    </head>

### Set up pages

    let book;

    function setup() {

        createCanvas(500, 500);
        book = new Sketchbook();

        book.newPage();
        book.value.radius = 200;
        book.paper.background("#66A182");

        book.newPage("3D");
        book.value.radius = 0;

        book.run();
    }

### Update and draw the current page

Where book.onPage(n) updates and draws the nth page in the sketchbook, only if it is the current page that's being shown.

    function draw() {

        book.onPage(0);
        book.value.radius--;
        book.paper.ellipse(100, 100, book.value.radius);

        book.onPage(1);
        book.value.radius++;
        book.paper.background("#2E4057");
        book.paper.sphere(book.value.radius);

        book.draw();
    }

### Change pages

Using mousePressed() as an example. To show the next or previous sketch:

    function mousePressed() {

        if (mouseButton == LEFT) {
            book.previous();
        } else if (mouseButton == RIGHT) {
            book.next();
        }
    }

If you get to the end of the sketchbook it wraps around to the start.

## Useful functions

### Show a specific page

Where with viewPage(n), the nth page is shown.

    book.viewPage(1);
    book.draw();

### Get the number of pages in the sketchbook

    let numberOfPages = book.length();

### Get the index of the current page

    let index = book.getPage();

## Credits

p5.sketchbook is a project by [Rianna Suen](https://vividfax.github.io), made with [support from people like you!](https://patreon.com/vividfax)

If you're new to p5.js I've also written a primer on [learning how to code with p5.js](https://vividfax.notion.site/Learn-to-code-with-p5-js-8adbbbee0e7c400cbd590a8c883451f0).
