# p5.sketchbook

Create and manage multiple p5.js sketches in one canvas.

## How to use

### Include it in the .html

    <head>
        <script src="libraries/sketchbook.js"></script>
    </head>

### Setup pages

    let book;

    function setup() {

        createCanvas(500, 500);
        book = new Sketchbook();

        book.newPage();
        book.value.radius = 200;
        book.paper.background("#cccccc");

        book.newPage("3D");
        book.value.radius = 0;

        book.run();
    }

### Update and draw the current page

Where book.onPage(n) updates and draws the nth page in the sketchbook. Pages will only update and draw when they are the active page.

    function draw() {

        book.onPage(0);
        book.value.radius--;
        book.paper.ellipse(100, 100, book.value.radius);

        book.onPage(1);
        book.value.radius++;
        book.paper.background("#oaoaoa");
        book.paper.sphere(book.value.radius);

        book.draw();
    }

### Change pages

Using mousePressed() as an example. To show the next sketch:

    function mousePressed() {
        book.next();
    }

 To show the previous sketch:

    function mousePressed() {
        book.previous();
    }

If you get to the end of the sketchbook it wraps around to the start.

## Useful functions

### Draw a specific page

Where with viewPage(n), the nth page is drawn.

    book.viewPage(1);

### Get the number of pages in the sketchbook

    let numberOfPages = book.length();

### Get the index of the current page

    let index = book.getPage();

## Credits

p5.sketchbook was made by [Rianna Suen](https://vividfax.github.io), with [support from people like you!](https://patreon.com/vividfax)
