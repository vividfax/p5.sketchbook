// p5.sketchbook
// by Rianna Suen @vividfax
// https://vividfax.github.io

class Sketchbook {

    constructor(dimension) {

        this.pages = [];
        this.pageNumber = 0;

        this.junk = createGraphics(1, 1);
        this.junk3d = createGraphics(1, 1, WEBGL);
    }

    draw() {

        if (this.pages[this.pageNumber].dimension != "3D") image(this.pages[this.pageNumber].backing, 0, 0);

        image(this.pages[this.pageNumber].surface, 0, 0);
    }

    getPage() {
        return this.pageNumber;
    }

    length() {
        return this.pages.length;
    }

    load() {
        this.value = {};
    }

    newPage(dimension) {

        this.pages.push(new Page(dimension));
        this.value = this.pages[this.length()-1].setup;

        if (dimension == "3D") this.paper = this.pages[this.length()-1].surface;
        else this.paper = this.pages[this.length()-1].backing;
    }

    next() {

        this.pageNumber++;
        if (this.pageNumber >= this.length()) this.pageNumber = 0;

        this.paper = this.pages[this.pageNumber].surface;
        this.update = this.pages[this.pageNumber].update;

        clear();
    }

    onPage(n) {

        if (typeof n != "number") return;

        if (this.pages[n] instanceof Page) {

            if (this.pages[n].dimension == "3D") this.paper = this.junk3d;
            else this.paper = this.junk;
            this.value = {};
        }

        if (this.pageNumber != n) return;

        if (this.pages[n] instanceof Page) {
            this.paper = this.pages[n].surface;
            this.value = this.pages[n].update;
        }
    }

    previous() {

        this.pageNumber--;
        if (this.pageNumber < 0) this.pageNumber = this.length()-1;

        this.paper = this.pages[this.pageNumber].surface;
        this.value = this.pages[this.pageNumber].update;

        clear();
    }

    reset() {

        this.pages[this.pageNumber].reset();
        this.pages[this.pageNumber].clear();
    }

    run() {

        this.pageNumber = 0;

        for (let i = 0; i < this.length(); i++) {

            this.pages[i].reset();
        }
    }

    viewPage(n) {

        if (typeof n != "number") return;

        if (this.pages[n] instanceof Page) {
            this.pageNumber = n;
            this.paper = this.pages[this.pageNumber].surface;
            this.value = this.pages[this.pageNumber].update;
        }
    }
}

class Page {

    constructor(dimension) {

        this.dimension = dimension;

        if (dimension == "3D") {
            this.surface = createGraphics(width, height, WEBGL);
        } else {
            this.backing = createGraphics(width, height);
            this.surface = createGraphics(width, height);
        }

        this.setup = {};
        this.update = {};
    }

    clear() {
        this.surface.clear();
    }

    reset() {
        this.update = Object.assign({}, this.setup);
    }
}