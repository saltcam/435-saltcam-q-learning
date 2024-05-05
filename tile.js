class Tile {

    constructor() {
        this.north = 0;
        this.east = 0;
        this.south = 0;
        this.west = 0;
        this.value = 0;
    }

    updateDirs(north, east, south, west){
        this.north = north;
        this.east = east;
        this.south = south;
        this.west = west;
    }

    updateValue(val) {
        this.value = val;
    }

}