// p5.Sketchbook
// by Rianna Suen
// @vividfax

class Sketchbook {

    constructor(dimension) {

        this.papers = [];
        this.paperNumber = 0;

        // this.newPage(dimension);

        this.junk = createGraphics(width, height);
        this.junk3D = createGraphics(width, height, WEBGL);
    }

    draw() {

        if (this.papers[this.paperNumber].dimension != "3D") image(this.papers[this.paperNumber].backing, 0, 0);

        image(this.papers[this.paperNumber].surface, 0, 0);
    }

    length() {

        return this.papers.length;
    }

    next() {

        this.paperNumber++;
        if (this.paperNumber >= this.length()) this.paperNumber = 0;

        this.paper = this.papers[this.paperNumber].surface;
        this.update = this.papers[this.paperNumber].update;

        clear();
    }

    previous() {

        this.paperNumber--;
        if (this.paperNumber < 0) this.paperNumber = this.length()-1;

        this.paper = this.papers[this.paperNumber].surface;
        this.value = this.papers[this.paperNumber].update;

        clear();
    }

    newPage(dimension) {

        this.papers.push(new Page(dimension));
        this.value = this.papers[this.length()-1].setup;

        if (dimension == "3D") this.paper = this.papers[this.length()-1].surface;
        else this.paper = this.papers[this.length()-1].backing;
    }

    onPage(n) {

        if (typeof n != "number") return;

        if (this.papers[n] instanceof Page) {

            if (this.papers[n].dimension == "3D") this.paper = this.junk3D;
            else this.paper = this.junk;
            this.value = {};
        }

        if (this.paperNumber != n) return;

        if (this.papers[n] instanceof Page) {
            this.paper = this.papers[n].surface;
            this.value = this.papers[n].update;
        }
    }

    viewPage(n) {

        if (typeof n != "number") return;

        if (this.papers[n] instanceof Page) {
            this.paperNumber = n;
            this.paper = this.papers[this.paperNumber].surface;
            this.value = this.papers[this.paperNumber].update;
        }
    }

    getPage() {

        return this.paperNumber;
    }

    run() {

        this.paperNumber = 0;

        for (let i = 0; i < this.length(); i++) {

            this.papers[i].reset();
        }
    }

    reset() {

        this.papers[this.paperNumber].reset();
        this.papers[this.paperNumber].clear();
    }

    load() {

        this.value = {};
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

    reset() {

        this.update = Object.assign({}, this.setup);
    }

    clear() {

        this.surface.clear();
    }
}