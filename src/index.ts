const EMPTY_CELL = '_';
export const PLAYER_1 = 'X';
export const PLAYER_2 = 'O';

const GAME_STATES = {
  IN_PROGRESS: 'IN_PROGRESS',
  WON: 'WON',
  LOST: 'LOST',
};

type Player = 'X' | 'O';

type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

type Coords = {
  row: number;
  col: number;
};

type Move = '00' | '01' | '02' | '10' | '11' | '12' | '20' | '21' | '22';

export class TicTacDoJo {
  private board: string[][] = [
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  ];

  private gameState: GameState = GAME_STATES.IN_PROGRESS;

  private currentPlayer: Player = PLAYER_1;

  constructor() {}

  nextMove(player: Player, move: Move) {
    if (player !== this.currentPlayer) {
      throw new Error(
        `Player ${player} makes a move whilst it is the turn of ${this.currentPlayer}`
      );
    }

    const coords = this.getCoords(move);

    this.board[coords.row][coords.col] = player;
    this.updateGameState();

    if (this.gameState === GAME_STATES.IN_PROGRESS) {
      this.currentPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;
    }
  }

  private updateGameState() {
    if (this.hasWinner()) {
      this.gameState = GAME_STATES.WON;
    }
  }

  private hasWinner(): boolean {
    for (let topRowIndex = 0; topRowIndex < 3; topRowIndex++) {
      const cellToCheck = this.board[0][0];

      if (cellToCheck === EMPTY_CELL) {
        continue;
      }

      // check vertical winner
      for (let horizontalColsIndex = 0; horizontalColsIndex < 2; horizontalColsIndex++) {
        if (
          this.board[1][horizontalColsIndex] === cellToCheck &&
          this.board[2][horizontalColsIndex] === cellToCheck
        ) {
          return true;
        }
      }
    }

    // check vertical winner
    for (let topRowIndex = 0; topRowIndex < 3; topRowIndex++) {
      const cellToCheck = this.board[0][0];

      if (cellToCheck === EMPTY_CELL) {
        continue;
      }

      for (let rowsIndex = 0; rowsIndex < 2; rowsIndex++) {
        if (this.board[rowsIndex][1] === cellToCheck && this.board[rowsIndex][2] === cellToCheck) {
          return true;
        }
      }
    }

    return false;
  }

  private getCoords(move: Move): Coords {
    if (move.length !== 2) {
      throw new Error(`Move is of incorrect format: ${move}`);
    }

    const row = Number(move[0]);
    const validRowValues = [0, 1, 2];

    if (!validRowValues.includes(row)) {
      throw Error(`Move has incorrect row: ${row}`);
    }

    const col = Number(move[1]);
    const validColValues = [0, 1, 2];

    if (!validColValues.includes(col)) {
      throw Error(`Move has incorrect col: ${col}`);
    }

    return {
      row,
      col,
    };
  }

  displayBoard(): string {
    let output = '';
    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      const row = this.board[rowIndex];
      const isLastRow = rowIndex === row.length - 1;

      for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
        const cell = this.board[rowIndex][cellIndex];
        const cellOutput = cell === EMPTY_CELL ? '   ' : ` ${cell} `;

        let border = '|';

        if (cellIndex === row.length - 1) {
          border = isLastRow ? '' : '\n';
        }

        output = output + `${cellOutput}${border}`;
      }

      if (rowIndex === row.length - 1) {
        continue;
      }

      output = output + '-----------\n';
    }

    return output;
  }

  displayGameState(): string {
    if (this.gameState === GAME_STATES.WON) {
      return `Player ${this.currentPlayer} has won!`;
    }

    if (this.gameState === GAME_STATES.LOST) {
      return `Player ${this.currentPlayer} is lost`;
    }

    return `Player ${this.currentPlayer} is asked to make a move`;
  }
}
