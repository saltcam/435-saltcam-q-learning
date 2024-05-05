class agent {

    // Color: Green = 0; Blue = 1;
    constructor(game, color, x, y, boardCols, boardRows) {
        this.game = game;
        this.color = color;
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.reward = 0;
        this.steps = 0;
        this.epsilon = 1;
        this.decayThreshold = document.getElementById("epsilon_decay").value;
        this.decay = document.getElementById("epsilon").value;

        this.board = [];

        // empty tiles
        for (let i = 0; i < boardWidth; i++) {
            this.board[i] = [];
            for (let j = 0; j < boardHeight; j++) {
                this.board[i][j] = new Tile();
            }
        }

        // for (let i = 0; i < boardCols; i++) {
        //     for (let j = 0; j < boardRows; j++) {
        //         this.board[i][j] = new Tile();
        //     }
        //
        // }
    }


    update() {
        this.steps++;
        if (this.steps % this.decayThreshold === 0) {
            this.epsilon *= this.decay;
        }

        // some code that decides which values to increase/decrease x or y with
        let dx = 1;
        let dy = 0;
        let newCoords= this.game.gameBoard.attemptMove(this.color, this.x, this.y, dx, dy, this.spawnX, this.spawnY);

        this.reward += newCoords.pts;
        this.board[this.x][this.y].updateValue(newCoords.pts);
        this.x = newCoords.x;
        this.y = newCoords.y;


    }

    draw(ctx) {
        let spritePaths = ["Link_Green", "Link_Blue"];
        let image = new Image();
        image.src = "./assets/" + spritePaths[this.color] + ".png";
        ctx.drawImage(image, 0, 0, 64, 64, this.x*64, this.y*64, 128, 128);
    }


}