import { Player, PlayerStrategy } from '@/Player';
import { EMPTY_CELL, PLAYER_1, PLAYER_2, Coords } from '@/index';

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

    const board = [
      [PLAYER_1, EMPTY_CELL, PLAYER_2],
      [PLAYER_1, EMPTY_CELL, PLAYER_1],
      [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    ];

    let result = player.move(board, PLAYER_1);

    expect(result).toBe(expectedOutput);
  });
});
