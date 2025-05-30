import { PLAYER_1, TicTacDoJo } from '@/index';

describe('Tic-tac-toe game should work', () => {
  test('Empty board should be displayed', () => {
    const game = new TicTacDoJo();

    const expectedOutput =
      `   |   |   ` + `\n-----------\n` + `   |   |   ` + `\n-----------\n` + `   |   |   `;

    let result = game.displayBoard();

    expect(result).toBe(expectedOutput);
  });

  test('A player can make a move', () => {
    const game = new TicTacDoJo();

    const expectedOutput =
      ` X |   |   ` + `\n-----------\n` + `   |   |   ` + `\n-----------\n` + `   |   |   `;

    game.nextMove(PLAYER_1, '11');

    let result = game.displayBoard();

    expect(result).toBe(expectedOutput);
  });
});
