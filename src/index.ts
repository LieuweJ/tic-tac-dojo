const EMPTY_CELL = '_';

export class TicTacDoJo {
  private board: string[][] = [
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
  ];

  constructor() {
    console.log('TicTacDojo initialized');
  }

  displayBoard(): string {
    let output = '';
    for (let rowIndex = 0; rowIndex < this.board.length; rowIndex++) {
      const row = this.board[rowIndex];
      const isLastRow = rowIndex === row.length - 1;

      for (let cellIndex = 0; cellIndex < row.length; cellIndex++) {
        const cell = this.board[rowIndex][cellIndex];
        const cellOutput = EMPTY_CELL ? '   ' : ` ${cell} `;

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
