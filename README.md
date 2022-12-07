# p5.sketchbook

Create and manage multiple [p5.js](https://p5js.org/) sketches in one canvas. Useful for sketch compliations and things like [Genuary](https://genuary.art/).

Each page in the sketchbook has its own variables and it's easy to flip between the pages.

## How to use

### Include in the .html

Copy sketchbook.js into the libraries directory and include it in the .html.

    <head>
        <script src="libraries/p5.min.js"></script>
        <script src="libraries/sketchbook.js"></script>
    </head>

### Set up pages

In the setup() function, set up initial variables and everything that only gets drawn once, as usual. Don't forget to call book.run() lastly.

Each time book.newPage() is called it sets up a seperate variable instance. So book.value.radius will be different values for each page.

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

Update variables and draw shapes in the draw() loop. Where book.onPage(n) updates and draws the nth page in the sketchbook.

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
            book.paper.background("#2E4057");
            book.paper.sphere(book.value.radius);
        }

        book.draw();
    }

### Change pages

Using keyPressed() as an example. To show the next or previous sketch:

    function keyPressed() {

        if (keyCode === LEFT_ARROW) {
            book.previous();
        } else if (keyCode === RIGHT_ARROW) {
            book.next();
        }
    }

If you get to the end of the sketchbook it wraps around to the start.

### Reset page to setup() state

Resets the currently shown page's variables to their original state as written in the setup() function. Includes everything that was drawn prior to book.run(). Again, using keyPressed() as an example.

    function keyPressed() {

        book.reset();
    }

## Useful functions

### Show a specific page

Where with viewPage(n), the nth page is shown.

    book.viewPage(1);
    book.draw();

### Get the number of pages in the sketchbook

    let numberOfPages = book.length();

### Get the index of the current page

    let currentPageIndex = book.getPage();

## Credits

p5.sketchbook is a project by [Rianna Suen](https://vividfax.github.io), made with [support from people like you!](https://patreon.com/vividfax)

If you're new to p5.js I've also written a primer on [learning how to code with p5.js](https://vividfax.notion.site/Learn-to-code-with-p5-js-8adbbbee0e7c400cbd590a8c883451f0).
