import { Player } from '@/Player';
import { EMPTY_CELL, PLAYER_1, PLAYER_2 } from '@/index';

describe('Player should work', () => {
  test('Player makes a move', () => {
    const player = new Player();

    const expectedOutput = `22`;

    const board = [
      [PLAYER_1, EMPTY_CELL, PLAYER_2],
      [PLAYER_1, EMPTY_CELL, PLAYER_1],
      [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
    ];

    const personalMarker = PLAYER_1;

    let result = player.move(board, personalMarker);

    expect(result).toBe(expectedOutput);
  });
});
