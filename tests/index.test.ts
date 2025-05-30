import { PLAYER_1, PLAYER_2, TicTacDoJo } from '@/index';

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
      `   |   |   ` + `\n-----------\n` + `   |   | X ` + `\n-----------\n` + `   |   |   `;

    game.nextMove(PLAYER_1, '12');

    let result = game.displayBoard();

    expect(result).toBe(expectedOutput);
  });

  test('The next player can be asked to make a move', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '12');
    const expectedOutput = `Player ${PLAYER_2} is asked to make a move`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won horizontally', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '00');
    game.nextMove(PLAYER_1, '01');
    game.nextMove(PLAYER_2, '02');

    const expectedOutput = `The game is won by ${PLAYER_1}`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });
});
