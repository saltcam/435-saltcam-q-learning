class agent {

    // Color: Green = 3; Blue = 4;
    constructor(game, color, x, y, boardCols, boardRows) {
        this.game = game;
        this.color = color;
        this.x = x;
        this.y = y;

        this.board = [boardCols][boardRows];

        for (let i = 0; i < boardCols; i++) {
            for (let j = 0; j < boardRows; j++) {
                this.board[i][j] = new Tile();
            }

        }
    }


    update() {

        // some code that decides which values to increase/decrease x or y with
        let dx = 1;
        let dy = 0;
        this.game.gameBoard.attemptMove(this.x, this.y, dx, dy);

    }

    draw(ctx) {

    }


}