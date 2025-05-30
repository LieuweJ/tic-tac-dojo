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
    const coords = this.getCoors(move);

    this.board[coords.row][coords.col] = player;
    this.updateGameState();

    this.currentPlayer = player === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  }

  private updateGameState() {
    console.log('updating gameState here.');
    return;
  }

  private getCoors(move: Move): Coords {
    const row = Number(move[0]);
    const validRowValues = [0, 1, 2];

    if (!validRowValues.includes(row)) {
      throw Error(`move has incorrect row: ${row}`);
    }

    const col = Number(move[1]);
    const validColValues = [0, 1, 2];

    if (!validColValues.includes(col)) {
      throw Error(`move has incorrect row: ${row}`);
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

  displayGameState() {
    switch (this.gameState) {
      case GAME_STATES.WON:
        return `the game is won by ${this.currentPlayer}`;
      case GAME_STATES.LOST:
        return 'the game is lost';
      default:
        return `Player ${this.currentPlayer} is asked to make a move`;
    }
  }
}
