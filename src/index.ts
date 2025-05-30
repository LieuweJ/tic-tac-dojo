const EMPTY_CELL = '_';
export const PLAYER_1 = 'X';

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

  constructor() {}

  nextMove(player: string, move: Move) {
    console.log('nothing happened', player, move);
    const coords = this.getCoors(move);

    this.board[coords.row][coords.col] = player;
    const a = 1;
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
}
