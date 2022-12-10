// p5.sketchbook
// by Rianna Suen @vividfax
// https://vividfax.github.io

class Sketchbook {

    constructor(dimension) {

        _this.pages = [];
        _this.pageNumber = 0;

        _this.junk = createGraphics(1, 1);
        _this.junk3d = createGraphics(1, 1, WEBGL);
    }

    draw() {

        if (_this.pages[_this.pageNumber].dimension != "3D") image(_this.pages[_this.pageNumber].backing, 0, 0);

        image(_this.pages[_this.pageNumber].surface, 0, 0);
    }

    getPage() {
        return _this.pageNumber;
    }

    length() {
        return _this.pages.length;
    }

    load() {
        _this.value = {};
    }

    newPage(dimension) {

        _this.pages.push(new Page(dimension));
        _this.value = _this.pages[this.length()-1].setup;

        if (dimension == "3D") _this.paper = _this.pages[this.length()-1].surface;
        else _this.paper = _this.pages[this.length()-1].backing;
    }

    next() {

        _this.pageNumber++;
        if (_this.pageNumber >= this.length()) _this.pageNumber = 0;

        _this.paper = _this.pages[_this.pageNumber].surface;
        _this.update = _this.pages[_this.pageNumber].update;

        clear();
    }

    onPage(n) {

        if (typeof n != "number") return;

        if (_this.pages[n] instanceof Page) {

            if (_this.pages[n].dimension == "3D") _this.paper = _this.junk3d;
            else _this.paper = _this.junk;
            _this.value = {};
        }

        if (_this.pageNumber != n) return;

        if (_this.pages[n] instanceof Page) {
            _this.paper = _this.pages[n].surface;
            _this.value = _this.pages[n].update;
        }
    }

    previous() {

        _this.pageNumber--;
        if (_this.pageNumber < 0) _this.pageNumber = this.length()-1;

        _this.paper = _this.pages[_this.pageNumber].surface;
        _this.value = _this.pages[_this.pageNumber].update;

        clear();
    }

    reset() {

        _this.pages[_this.pageNumber].reset();
        _this.pages[_this.pageNumber].clear();
    }

    run() {

        _this.pageNumber = 0;

        for (let i = 0; i < this.length(); i++) {

            _this.pages[i].reset();
        }
    }

    viewPage(n) {

        if (typeof n != "number") return;

        if (_this.pages[n] instanceof Page) {
            _this.pageNumber = n;
            _this.paper = _this.pages[_this.pageNumber].surface;
            _this.value = _this.pages[_this.pageNumber].update;
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
        _this.update = {};
    }

    clear() {
        this.surface.clear();
    }

    reset() {
        _this.update = Object.assign({}, this.setup);
    }
}