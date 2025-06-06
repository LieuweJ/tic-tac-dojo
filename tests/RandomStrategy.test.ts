import { Board, EMPTY_CELL, PLAYER_MARKER_X, PLAYER_MARKER_O } from '../src/Game';
import { RandomStrategy } from '../src/RandomStrategy';

describe('RandomStrategy should work', () => {
  test('RandomStrategy returns a move which is on an empty cell on the board.', () => {
    const board: Board = [
      [PLAYER_MARKER_X, EMPTY_CELL, PLAYER_MARKER_O],
      [PLAYER_MARKER_X, EMPTY_CELL, PLAYER_MARKER_X],
      [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    ];

    const strategy = new RandomStrategy();

    const emptyMovesOnBoard = /01|11|20|21|22/;

    let result = strategy.move(board);

    expect(result).toMatch(emptyMovesOnBoard);
  });
});
