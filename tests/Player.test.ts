import { Player, PlayerStrategy } from '@/Player';
import { EMPTY_CELL, PLAYER_MARKER_X, PLAYER_MARKER_Y, Coords, Board } from '@/index';

const TestStrategy = class TestStrategy implements PlayerStrategy {
  expectedMove: Coords;

  constructor(expectedMove: Coords) {
    this.expectedMove = expectedMove;
  }

  move(): Coords {
    return this.expectedMove;
  }
};

describe('Player should work', () => {
  test('Player makes a move', () => {
    const expectedOutput = {
      row: 0,
      col: 0,
    };

    const strategy = new TestStrategy(expectedOutput);

    const player = new Player(strategy);

    const board: Board = [
      [PLAYER_MARKER_X, EMPTY_CELL, PLAYER_MARKER_Y],
      [PLAYER_MARKER_X, EMPTY_CELL, PLAYER_MARKER_X],
      [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    ];

    let result = player.move(board, PLAYER_MARKER_X);

    expect(result).toBe(expectedOutput);
  });
});
