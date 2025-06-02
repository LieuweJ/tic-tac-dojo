import { PlayerStrategy } from './Player';
import { Board, Move, EMPTY_CELL, ALL_BOARD_MOVES } from './Game';

export class RandomStrategy implements PlayerStrategy {
  private typedMove(move: string): Move {
    const typedMove = move as Move;
    if (!ALL_BOARD_MOVES.includes(typedMove)) {
      throw Error(`Invalid move: ${move}`);
    }

    return typedMove;
  }

  public move(board: Board): Move {
    const fallbackMove = '00';

    const emptyFields: Move[] = [];
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      const row = board[rowIndex];

      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const cell = row[colIndex];

        if (cell !== EMPTY_CELL) {
          continue;
        }

        const move = `${rowIndex}${colIndex}`;

        emptyFields.push(this.typedMove(move));
      }
    }

    const min = 0;
    const max = emptyFields.length - 1;

    const randomIndex = Math.floor(Math.random() * (max - min) + min);

    return emptyFields[randomIndex] ?? fallbackMove;
  }
}
