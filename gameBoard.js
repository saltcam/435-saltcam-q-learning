
const boardWidth = 10;
const boardHeight = 10;
class GameBoard {

    constructor(game) {
        this.game = game;

        this.board = [];

        for (let i = 0; i < boardWidth; i++) {
            this.board[i] = [];
            for (let j = 0; j < boardHeight; j++) {
                this.board[i][j] = 0;
            }
        }

        // 0 = empty
        // 1 = goal (1000 pts)
        // 2 = pitfall (-1000 pts)
        // 3 = green (-1000 if blue)
        // 4 = blue (-1000 if green)

        this.board[0][0] = 1;
        this.board[1][0] = 2;
        this.board[2][0] = 3;
        this.board[3][0] = 4;
    }

    attemptMove(currX, currY, dx, dy) {


        // return {newX, newY, change in points
    }

    draw(ctx) {
        // 0 = empty
        // 1 = goal (1000 pts)
        // 2 = pitfall (-1000 pts)
        // 3 = green (-1000 if blue)
        // 4 = blue (-1000 if green)

        let spriteIndex = 0;
        let spritePaths = ["Empty", "Zelda", "Die", "Green", "Blue"];
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