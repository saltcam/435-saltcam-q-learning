class Tile {

    constructor() {
        // this.north = -5;
        // this.east = -5;
        // this.south = -5;
        // this.west = -5;

        this.NESW = [-5, -5, -5, -5];
    }
    maxAction(){

        let maxVal = Math.max(this.NESW[0], this.NESW[1], this.NESW[2], this.NESW[3]);
        let index = 0;
        let maxDX = 0;
        let maxDY = 0;
        switch (maxVal) {
            case this.NESW[0]:
                index = 0;
                maxDY = -1;
                break;
            case this.NESW[1]:
                index = 1;
                maxDX = 1;
                break;
            case this.NESW[2]:
                index = 2;
                maxDY = 1;
                break;
            case this.NESW[3]:
                index = 3;
                maxDX = -1;
                break;
        }


        return {maxDX: maxDX, maxDY: maxDY, index: index, maxVal: maxVal};
    }

}