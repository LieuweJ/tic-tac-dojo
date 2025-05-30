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

  test('Player cannot make a move which is outside of the board (vertically)', () => {
    const game = new TicTacDoJo();

    // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
    expect(() => game.nextMove(PLAYER_1, '42')).toThrow(new Error(`Move has incorrect row: 4`));
  });

  test('Player cannot make a move which is outside of the board (horizontally)', () => {
    const game = new TicTacDoJo();

    // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
    expect(() => game.nextMove(PLAYER_1, '24')).toThrow(new Error(`Move has incorrect col: 4`));
  });

  test('A move can only consist of a string with 2 numbers', () => {
    const game = new TicTacDoJo();

    const incorrectMove = '110';

    // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
    expect(() => game.nextMove(PLAYER_1, incorrectMove)).toThrow(
      new Error(`Move is of incorrect format: ${incorrectMove}`)
    );
  });

  test('Not allowed to make a move on a square which already is not empty,', () => {
    const game = new TicTacDoJo();

    const move = '00';

    game.nextMove(PLAYER_1, move);

    expect(() => game.nextMove(PLAYER_2, move)).toThrow(
      new Error(
        `Player ${PLAYER_2} wants to play move ${move}. This move is already taken on the board. Current board: \n${game.displayBoard()}`
      )
    );
  });

  test('The next player can be asked to make a move', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '12');
    const expectedOutput = `Player ${PLAYER_2} is asked to make a move`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('Move needs to be made by the next player', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '00');

    expect(() => game.nextMove(PLAYER_1, '10')).toThrow(
      new Error(`Player ${PLAYER_1} makes a move whilst it is the turn of ${PLAYER_2}`)
    );
  });

  test('The game can be won vertically', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '00');
    game.nextMove(PLAYER_2, '02');
    game.nextMove(PLAYER_1, '10');
    game.nextMove(PLAYER_2, '01');
    game.nextMove(PLAYER_1, '20');

    const expectedOutput = `Player ${PLAYER_1} has won!`;

    const actual = game.displayGameState();

    expect(actual).toBe(expectedOutput);
  });

  test('The game can be won horizontally', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '00');
    game.nextMove(PLAYER_2, '12');
    game.nextMove(PLAYER_1, '01');
    game.nextMove(PLAYER_2, '11');
    game.nextMove(PLAYER_1, '02');

    const expectedOutput = `Player ${PLAYER_1} has won!`;

    const actual = game.displayGameState();

    expect(actual).toBe(expectedOutput);
  });

  test('The game can be won diagonally (topLeft to bottomRight)', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '00');
    game.nextMove(PLAYER_2, '11');
    game.nextMove(PLAYER_1, '11');
    game.nextMove(PLAYER_2, '21');
    game.nextMove(PLAYER_1, '22');

    const expectedOutput = `Player ${PLAYER_1} has won!`;

    const actual = game.displayGameState();

    expect(actual).toBe(expectedOutput);
  });

  test('The game can be won diagonally (topRight to bottomLeft)', () => {
    const game = new TicTacDoJo();

    game.nextMove(PLAYER_1, '20');
    game.nextMove(PLAYER_2, '11');
    game.nextMove(PLAYER_1, '11');
    game.nextMove(PLAYER_2, '21');
    game.nextMove(PLAYER_1, '02');

    const expectedOutput = `Player ${PLAYER_1} has won!`;

    const actual = game.displayGameState();

    expect(actual).toBe(expectedOutput);
  });
});
