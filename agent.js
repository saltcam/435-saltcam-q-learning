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
        this.learnRate = 0.5;
        this.decayThreshold = document.getElementById("epsilon_decay").value;
        this.decay = document.getElementById("epsilon").value;
        this.discount = document.getElementById("discount_rate").value;

        this.board = [];

        // empty tiles
        for (let i = 0; i < boardWidth; i++) {
            this.board[i] = [];
            for (let j = 0; j < boardHeight; j++) {
                this.board[i][j] = new Tile();
            }
        }
    }

    sharedSpace() {

        let shared = false;
        for (let i = 0; i < this.game.entities.length; i++) {
            if(this.game.entities[i].color !== this.color && this.game.entities[i].x === this.x && this.game.entities[i].y === this.y) {
                shared = true;
            }
        }
        return shared;
    }


    update() {
        this.steps++;
        if (this.steps % this.decayThreshold === 0) {
            this.epsilon *= this.decay;
        }

        // some code that decides which values to increase/decrease x or y with
        let dx = 0;
        let dy = 0;
        let dirIndex = 0;

        let tile = this.game.gameBoard.board[this.x][this.y];
        // respawn if on a bomb or goal
        if(tile > 2 || ((tile === 0 || tile === 1) && this.color !== tile)) {
            this.x = this.spawnX;
            this.y = this.spawnY;
        }

        if(Math.random() > this.epsilon) {
            let dir = this.board[this.x][this.y].maxAction();
            dx = dir.maxDX;
            dy = dir.maxDY;
            dirIndex = dir.index;
        } else {
            let mov = [
                {dx: 0, dy: -1},
                {dx: 1, dy: 0},
                {dx: 0, dy: 1},
                {dx: -1, dy: 0}];

            let randIndex = Math.floor(Math.random() * 4);
            // console.log(randIndex);

            dx = mov[randIndex].dx;
            dy = mov[randIndex].dy;
            dirIndex = randIndex;
        }

        // let dx = Math.round(Math.random() * 2 - 1);
        // let dy = Math.round(Math.random() * 2 - 1);
        // console.log("Color: " + this.color + "{" + dx + ", " + dy + "}");
        let newCoords=
            this.game.gameBoard.attemptMove(this.color, this.x, this.y, dx, dy);

        // console.log(this.board[this.x][this.y].NESW[dirIndex]);


        let Qval = (1 - this.learnRate) * this.board[this.x][this.y].NESW[dirIndex] + this.learnRate *
            (newCoords.pts + this.discount * this.board[newCoords.x][newCoords.y].maxAction().maxVal);


        this.board[this.x][this.y].NESW[dirIndex] = Qval;

        // IMPORTANT take action, THEN we can update Q-values
        this.reward += newCoords.pts;
        // this.board[this.x][this.y].updateValue(newCoords.pts);
        this.x = newCoords.x;
        this.y = newCoords.y;


    }

    draw(ctx) {
        let spritePaths = ["Link_Green", "Link_Blue", "Link_Both"];
        let image = new Image();
        let imgColor = "";
        if(this.sharedSpace()) {
            imgColor = spritePaths[2];
        } else {
            imgColor = spritePaths[this.color];
        }
        image.src = "./assets/" + imgColor + ".png";
        ctx.drawImage(image, 0, 0, 64, 64, this.x*64, this.y*64, 128, 128);

        for (let i = 0; i < boardWidth; i++) {
            for (let j = 0; j < boardHeight; j++) {

            ctx.font = "16px serif";
            ctx.fillText(Math.round(this.board[i][j].NESW[0]).toString(), i*64+32, (j+1)*64-48);
            ctx.fillText(Math.round(this.board[i][j].NESW[1]).toString(), i*64+48, (j+1)*64-32);
            ctx.fillText(Math.round(this.board[i][j].NESW[2]).toString(), i*64+32, (j+1)*64-8);
            ctx.fillText(Math.round(this.board[i][j].NESW[3]).toString(), i*64, (j+1)*64-32);

            }
        }
    }


}