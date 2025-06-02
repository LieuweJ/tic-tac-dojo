import { PlayerInterface } from './Player';

export const EMPTY_CELL = '_';
export const PLAYER_MARKER_X = 'X';
export const PLAYER_MARKER_O = 'O';

export const GAME_STATES = {
  IN_PROGRESS: 'IN_PROGRESS',
  WON: 'WON',
  TIE: 'TIE',
};

export type PlayerMarker = typeof PLAYER_MARKER_X | typeof PLAYER_MARKER_O;

type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

export type Coords = {
  row: number;
  col: number;
};

export const ALL_BOARD_MOVES = ['00', '01', '02', '10', '11', '12', '20', '21', '22'] as const;

export type Move = (typeof ALL_BOARD_MOVES)[number];

type BoardCell = typeof EMPTY_CELL | PlayerMarker;
export type Board = BoardCell[][];

export class Game {
  private board: Board = [
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  ];

  private gameState: GameState = GAME_STATES.IN_PROGRESS;

  private currentPlayerMarker: PlayerMarker = PLAYER_MARKER_X;

  private players: { X: PlayerInterface; O: PlayerInterface };

  constructor({ player1, player2 }: { player1: PlayerInterface; player2: PlayerInterface }) {
    this.players = {
      X: player1,
      O: player2,
    };
  }

  play() {
    while (this.gameState === GAME_STATES.IN_PROGRESS) {
      console.log(this.displayGameState());
      const currentPlayer = this.players[this.currentPlayerMarker];

      this.updateBoard(currentPlayer.move(this.board, this.currentPlayerMarker));
      this.updateGameState();
      console.log(this.displayBoard());

      this.updateCurrentPlayerMarker();
    }

    console.log(this.displayGameState());
    console.log(this.displayBoard());
    return this.displayBoard();
  }

  private updateCurrentPlayerMarker() {
    if (this.gameState === GAME_STATES.IN_PROGRESS) {
      this.currentPlayerMarker =
        this.currentPlayerMarker === PLAYER_MARKER_X ? PLAYER_MARKER_O : PLAYER_MARKER_X;
    }
  }

  private updateBoard(move: Move) {
    if (this.gameState !== GAME_STATES.IN_PROGRESS) {
      throw new Error(`No moves allowed. Current game.state: ${this.gameState}`);
    }

    const coords = this.getCoords(move);

    if (this.board[coords.row][coords.col] !== EMPTY_CELL) {
      throw new Error(
        `Player ${this.currentPlayerMarker} wants to play move ${move}. This move is already taken on the board.`
      );
    }

    this.board[coords.row][coords.col] = this.currentPlayerMarker;
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
    for (let colIndex = 0; colIndex < 3; colIndex++) {
      const cellToCheck = this.board[colIndex][0];

      if (cellToCheck === EMPTY_CELL) {
        continue;
      }

      // check horizontal winner
      if (cellToCheck === this.board[colIndex][1] && cellToCheck === this.board[colIndex][2]) {
        return true;
      }
    }

    return false;
  }

  private hasVerticalWinner(): boolean {
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const cellToCheck = this.board[0][rowIndex];

      if (cellToCheck === EMPTY_CELL) {
        continue;
      }

      if (cellToCheck === this.board[1][rowIndex] && cellToCheck === this.board[2][rowIndex]) {
        return true;
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
      return `Player ${this.players[this.currentPlayerMarker].getDisplayName()} (${this.currentPlayerMarker}) has won!`;
    }

    if (this.gameState === GAME_STATES.TIE) {
      return `Game is a tie!`;
    }

    return `It is player ${this.players[this.currentPlayerMarker].getDisplayName()}'s (playing with ${this.currentPlayerMarker}) turn`;
  }
}
