import { Player } from '@/Player';

export const EMPTY_CELL = '_';
export const PLAYER_MARKER_X = 'X';
export const PLAYER_MARKER_Y = 'O';

export const GAME_STATES = {
  IN_PROGRESS: 'IN_PROGRESS',
  WON: 'WON',
  TIE: 'TIE',
};

export type PlayerMarker = typeof PLAYER_MARKER_X | typeof PLAYER_MARKER_Y;

type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

export type Coords = {
  row: number;
  col: number;
};

export type Move = '00' | '01' | '02' | '10' | '11' | '12' | '20' | '21' | '22';

type BoardCell = typeof EMPTY_CELL | PlayerMarker;
export type Board = BoardCell[][];

export class TicTacDoJo {
  private board: Board = [
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  ];

  private gameState: GameState = GAME_STATES.IN_PROGRESS;

  private currentPlayer: PlayerMarker = PLAYER_MARKER_X;

  nextMove(player: PlayerMarker, move: Move) {
    if (this.gameState !== GAME_STATES.IN_PROGRESS) {
      throw new Error(`No moves allowed. Current game.state: ${this.gameState}`);
    }

    if (player !== this.currentPlayer) {
      throw new Error(
        `Player ${player} makes move ${move} whilst it is the turn of ${this.currentPlayer}`
      );
    }

    const coords = this.getCoords(move);

    if (this.board[coords.row][coords.col] !== EMPTY_CELL) {
      throw new Error(
        `Player ${player} wants to play move ${move}. This move is already taken on the board. Current board: \n${this.displayBoard()}`
      );
    }

    this.board[coords.row][coords.col] = player;
    this.updateGameState();

    if (this.gameState === GAME_STATES.IN_PROGRESS) {
      this.currentPlayer = player === PLAYER_MARKER_X ? PLAYER_MARKER_Y : PLAYER_MARKER_X;
    }
  }

  private updateGameState() {
    if (this.hasWinner()) {
      this.gameState = GAME_STATES.WON;

      return;
    }

    if (this.hasTie()) {
      this.gameState = GAME_STATES.TIE;

      return;
    }
  }

  private hasTie(): boolean {
    return this.board.every((row) => {
      return row.every((cell) => {
        return cell !== EMPTY_CELL;
      });
    });
  }

  private hasWinner(): boolean {
    if (this.hasHorizontalWinner()) {
      return true;
    }

    if (this.hasVerticalWinner()) {
      return true;
    }

    return this.hasDiagonalWinner();
  }

  private hasHorizontalWinner(): boolean {
    for (let topRowIndex = 0; topRowIndex < 3; topRowIndex++) {
      const cellToCheck = this.board[0][0];

      if (cellToCheck === EMPTY_CELL) {
        continue;
      }

      // check horizontal winner
      for (let colsIndex = 0; colsIndex < 2; colsIndex++) {
        if (this.board[1][colsIndex] === cellToCheck && this.board[2][colsIndex] === cellToCheck) {
          return true;
        }
      }
    }

    return false;
  }

  private hasVerticalWinner(): boolean {
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

  private hasDiagonalWinner(): boolean {
    // Check top left to bottom right:
    const cellTopLeft = this.board[0][0];
    if (
      cellTopLeft !== EMPTY_CELL &&
      this.board[1][1] === cellTopLeft &&
      this.board[2][2] === cellTopLeft
    ) {
      return true;
    }

    // Check top right to bottom left:
    const cellTopRight = this.board[2][0];
    if (
      cellTopRight !== EMPTY_CELL &&
      this.board[1][1] === cellTopRight &&
      this.board[0][2] === cellTopRight
    ) {
      return true;
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

    if (this.gameState === GAME_STATES.TIE) {
      return `Game is a tie!`;
    }

    return `Player ${this.currentPlayer} is asked to make a move`;
  }
}
