import { TicTacDoJo } from '@/index';

describe('Tic-tac-toe game should work', () => {
  test('Empty board should be displayed', () => {
    const game = new TicTacDoJo();

    const expectedOutput =
      `   |   |   ` + `\n-----------\n` + `   |   |   ` + `\n-----------\n` + `   |   |   `;

    let result = game.displayBoard();

    expect(result).toBe(expectedOutput);
  });
});
