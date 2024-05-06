
const boardWidth = 9;
const boardHeight = 10;
class GameBoard {

    constructor(game) {
        this.game = game;

        this.board = [];

        // empty tiles
        for (let i = 0; i < boardWidth; i++) {
            this.board[i] = [];
            for (let j = 0; j < boardHeight; j++) {
                this.board[i][j] = 2;
            }
        }

        // 0 = green (-1000 if blue)
        // 1 = blue (-1000 if green)
        // 2 = empty
        // 3 = bomb (-1000)
        // 4 = Goal/Zelda (+1000)

        // Bombs
        this.board[2][7] = 3;
        this.board[4][7] = 3;
        this.board[5][4] = 3;
        this.board[6][5] = 3;
        this.board[7][6] = 3;
        this.board[0][0] = 3;
        this.board[8][0] = 3;

        // green
        for (let i = 1; i < boardHeight-3; i++) {
            this.board[4][i] = 0;
        }
        this.board[8][7] = 0;
        this.board[7][3] = 0;
        this.board[7][4] = 0;
        this.board[7][5] = 0;
        this.board[8][3] = 0;
        this.board[8][4] = 0;
        this.board[8][5] = 0;

        // blue
        for (let i = 1; i < boardHeight-3; i++) {
            this.board[3][i] = 1;
        }
        this.board[0][6] = 1;
        this.board[1][6] = 1;
        this.board[2][6] = 1;


        // Zelda
        this.board[3][0] = 4;
        this.board[8][4] = 4;
        this.board[0][3] = 4;
        this.board[4][0] = 4;
    }

    attemptMove(color, currX, currY, dx, dy) {

        // check if we are on bomb or goal first

        let newX = 0;
        let newY = 0;

        if(currX + dx >= boardWidth || currX + dx < 0) {
            newX = currX;
        } else {
            newX = currX + dx;
        }
        if(currY + dy >= boardHeight || currY + dy < 0) {
            newY = currY;
        } else {
            newY = currY + dy;
        }

        // reward handling for tile types here!
        let reward = -5;
        let tile = this.board[newX][newY];
        // 0 = green (-50 if blue)
        // 1 = blue (-50 if green)
        // 2 = empty
        // 3 = bomb (-100)
        // 4 = Goal/Zelda (+100)
        if((tile === 0 || tile === 1) && color !== tile) {
            reward = -100;
        } else if(tile === 2 || color === tile) {
            reward = -5;
        } else if(tile === 3) {
            reward = -100;
        } else {
            reward = 100;
        }

        return {x: newX, y: newY, pts: reward} // change in points
    }

    draw(ctx) {

        // 0 = green (-1000 if blue)
        // 1 = blue (-1000 if green)
        // 2 = empty
        // 3 = bomb (-1000)
        // 4 = Goal/Zelda (+1000)

        let spriteIndex = 0;
        let spritePaths = ["Green", "Blue", "Empty", "Die", "Zelda"];
        for (let i = 0; i < boardWidth; i++) {
            for (let j = 0; j < boardHeight; j++) {


                // console.log("./assets/" + spritePaths[spriteIndex] + ".png");

                spriteIndex = this.board[i][j];
                let image = new Image();
                image.src = "./assets/" + spritePaths[spriteIndex] + ".png";
                ctx.drawImage(image, 0, 0, 64, 64, i*64, j*64, 128, 128);
            }
        }
    }


}