import { EMPTY_CELL, Board, Move, Coords, PlayerMarker as PlayerMarker } from '@/index';

export interface PlayerStrategy {
  move: (board: Board, playerMarker: PlayerMarker) => Coords;
}

export class Player {
  strategy: PlayerStrategy;
  constructor(strategy: PlayerStrategy) {
    this.strategy = strategy;
  }

  public move(board: Board, currentMarker: PlayerMarker): Coords {
    return this.strategy.move(board, currentMarker);
  }
}

// class RandomStrategy implements Strategy {
//   public move(board: Board, personalMarker: PlayerMarker): Coords {
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
//   }
// }
