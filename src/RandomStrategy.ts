import { PlayerStrategy } from '@/Player';
import { Board, PlayerMarker, Move } from '@/index';

export class RandomStrategy implements PlayerStrategy {
  public move(board: Board, personalMarker: PlayerMarker): Move {
    return '00';
    //     const fallbackMove = {
    //       row: 0,
    //       col: 0,
    //     };
    //     const emptyFields: Coords[] = [];
    //     for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    //       const row = board[rowIndex];
    //
    //       for (let colIndex = 0; colIndex < row.length; colIndex++) {
    //         const cell = row[colIndex];
    //
    //         if (cell === EMPTY_CELL) {
    //           emptyFields.push({
    //             row: rowIndex,
    //             col: colIndex,
    //           });
    //         }
    //       }
    //     }
    //
    //     const min = 0;
    //     const max = emptyFields.length - 1;
    //
    //     const randomIndex = Math.random() * (max - min) + min;
    //
    //     return emptyFields[randomIndex] ?? fallbackMove;
  }
}
