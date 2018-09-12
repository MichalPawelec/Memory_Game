const memoryGame = {
    numOfTiles : 20,
    tilesInRow : 5,
    board : null,
    score : null,
    tiles : [],
    tilesClicked : [],
    moveCount : 0,
    tilesImages : [
        'images/bulbasaur.png',
        'images/charmander.png',
        'images/squirtle.png',
        'images/vulpix.png',
        'images/jigglypuff.png',
        'images/meowth.png',
        'images/growlithe.png',
        'images/pikachu.png',
        'images/togepi.png',
        'images/eevee.png'
    ],
    canClick : true,
    pairsGuessed : 0,

    tileClick : function(e) {
        if (this.canClick) {
            if (!this.tilesClicked[0] || (this.tilesClicked[0].dataset.index !== e.target.dataset.index)) {
                this.tilesClicked.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.tilesImages[e.target.dataset.cardType] + ')';
            };

            if (this.tilesClicked.length === 2) {
                this.canClick = false;

                if (this.tilesClicked[0].dataset.cardType === this.tilesClicked[1].dataset.cardType) {
                    setTimeout(this.deleteTiles.bind(this), 500);
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                }

                this.moveCount++;
                this.score.innerHTML = 'Checked pairs: ' + this.moveCount;
            };
        };
    },

    deleteTiles : function() {
        this.tilesClicked[0].remove();
        this.tilesClicked[1].remove();

        this.canClick = true;
        this.tilesClicked = [];

        this.pairsGuessed++;
        document.getElementById('audio').play();
        if (this.pairsGuessed >= this.numOfTiles / 2) {
            this.score.innerText = 'Congratulations!';
            this.score.style.fontSize = '10vh';
        };
    },

    resetTiles : function() {
        this.tilesClicked[0].style.backgroundImage = 'url(images/pokeball.png)';
        this.tilesClicked[1].style.backgroundImage = 'url(images/pokeball.png)';

        this.tilesClicked = [];
        this.canClick = true;
    },

    startGame : function() {
        this.board = document.querySelector('.game-board');
        this.board.innerHTML = '';

        this.score = document.querySelector('.game-score');
        this.score.innerHTML = '';

        this.tiles = [];
        this.tilesClicked = [];
        this.moveCount = 0;
        this.canClick = true;
        this.pairsGuessed = 0;

        for (let i = 0; i < this.numOfTiles; i++) {
            this.tiles.push(Math.floor(i / 2));
        };

        for (let i = this.numOfTiles - 1; i > 0; i--) {
            const toggle = Math.floor(Math.random() * i);
            const temp = this.tiles[i];
            this.tiles[i] = this.tiles[toggle];
            this.tiles[toggle] = temp;
        };

        for (let i = 0; i < this.numOfTiles; i++) {
            const tile = document.createElement('div');
            tile.classList.add("game-tile");
            this.board.appendChild(tile);

            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i;

            tile.style.left = 5 + (tile.offsetWidth+10) * (i % this.tilesInRow) + 'px'
            tile.style.top = 5 + (tile.offsetHeight+10) * (Math.floor(i / this.tilesInRow)) + 'px';

            tile.addEventListener('click', this.tileClick.bind(this));
        };
    }
};

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('button').addEventListener('click', function() {
        memoryGame.startGame();
    });
});