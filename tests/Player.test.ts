import { Player, PlayerStrategy } from '@/Player';
import { EMPTY_CELL, PLAYER_MARKER_X, PLAYER_MARKER_O, Coords, Board, Move } from '@/Game';

const TestStrategy = class TestStrategy implements PlayerStrategy {
  expectedMove: Move;

  constructor(expectedMove: Move) {
    this.expectedMove = expectedMove;
  }

  move(): Move {
    return this.expectedMove;
  }
};

describe('Player should work', () => {
  test('Player makes a move', () => {
    const expectedOutput = '00';

    const strategy = new TestStrategy(expectedOutput);

    const player = new Player(strategy);

    const board: Board = [
      [PLAYER_MARKER_X, EMPTY_CELL, PLAYER_MARKER_O],
      [PLAYER_MARKER_X, EMPTY_CELL, PLAYER_MARKER_X],
      [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    ];

    let result = player.move(board, PLAYER_MARKER_X);

    expect(result).toBe(expectedOutput);
  });
});
