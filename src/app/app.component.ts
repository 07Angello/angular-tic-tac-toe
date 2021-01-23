import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    .main {
      height: 100%;
      width: 100%;
      background-color: #81d3f9;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .board {
      width: 300px;
      height: 300px;
      border: gray 1px solid;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .square {
      border: black 1px solid;
      height: 33.33%;
      width: 33.33%;
      font-weight: bold;
      font-size: 6vw;
    }

    .squareHighlighted {
      border: black 1px solid;
      height: 33.33%;
      width: 33.33%;
      font-weight: bold;
      color: green;
      font-size: 6vw;
    }

    .square:hover {
      background-color: gray;
    }
  `],
  template: `
  <div class="main">
    <h1>Tic Tac Toe</h1>
    <div class="board">
      <button *ngFor='let square of squares; index as i;' (click)="move(i)"
        [ngClass]="square.isHighlighted ? 'squareHighlighted' : 'square'">
        {{square.value}}
    </button>
    </div>
    <div>
      <p>Current turn: {{currentTurn}}</p>
      <p *ngIf="winner">WINNER IS: {{winner}}</p>
      <button (click)="resetGame()">Reset game</button>
    </div>
  </div>
  `
})
export class AppComponent implements OnInit {
  inProgress: boolean;
  winner: string;
  currentTurn: string;
  movesMade: 0;
  squares: any;
  game: Game;

  constructor() {}

  ngOnInit(): void {
    this.initializer();
  }

  move(index): void {
    if (this.inProgress && !this.squares[index].value) {
      this.squares[index].value = this.currentTurn;

      this.movesMade++;
      this.checkForWinner();
      this.currentTurn = (this.currentTurn === this.game.O) ?
      this.game.X : this.game.O;
    }
    console.log(this.squares);
  }

  checkForWinner(): void {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningCombinations.forEach((wc) => {
      const [a, b, c] = wc;
      const sqA = this.squares[a];
      const sqB = this.squares[b];
      const sqC = this.squares[c];

      if (sqA.value && sqA.value === sqB.value && sqA.value === sqC.value) {
        this.inProgress = false;
        this.winner = sqA.value;
        sqA.isHighlighted = sqB.isHighlighted = sqC.isHighlighted = true;
      }

      if (this.movesMade === this.squares.length) {
        this.inProgress = false;
      }
    });
  }

  resetGame(): void {
    this.initializer();
  }

  initializer(): void {
    this.game = new Game();
    this.squares = new Array(9).fill('').map(s => new Squares());
    this.currentTurn = this.game.X;
    this.inProgress = true;
    this.winner = '';
  }

}
export class Squares {
  value: string;
  isHighlighted: boolean;

  constructor() {
    this.value = '';
    this.isHighlighted = false;
  }
}

export class Game {
  X: string;
  O: string;

  constructor() {
    this.X = 'X';
    this.O = 'O';
  }
}
