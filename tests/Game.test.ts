import { GAME_STATES, PLAYER_MARKER_X, PLAYER_MARKER_Y, Game } from '@/Game';

describe('Tic-tac-toe game should work', () => {
  test('Empty board should be displayed', () => {
    const game = new Game();

    const expectedOutput =
      `   |   |   ` + `\n-----------\n` + `   |   |   ` + `\n-----------\n` + `   |   |   `;

    let result = game.displayBoard();

    expect(result).toBe(expectedOutput);
  });

  test('A player can make a move', () => {
    const game = new Game();

    const expectedOutput =
      `   |   |   ` + `\n-----------\n` + `   |   | X ` + `\n-----------\n` + `   |   |   `;

    game.nextMove(PLAYER_MARKER_X, '12');

    let result = game.displayBoard();

    expect(result).toBe(expectedOutput);
  });

  test('Player cannot make a move which is outside of the board (vertically)', () => {
    const game = new Game();

    // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
    expect(() => game.nextMove(PLAYER_MARKER_X, '42')).toThrow(
      new Error(`Move has incorrect row: 4`)
    );
  });

  test('Player cannot make a move which is outside of the board (horizontally)', () => {
    const game = new Game();

    // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
    expect(() => game.nextMove(PLAYER_MARKER_X, '24')).toThrow(
      new Error(`Move has incorrect col: 4`)
    );
  });

  test('A move can only consist of a string with 2 numbers', () => {
    const game = new Game();

    const incorrectMove = '110';

    // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
    expect(() => game.nextMove(PLAYER_MARKER_X, incorrectMove)).toThrow(
      new Error(`Move is of incorrect format: ${incorrectMove}`)
    );
  });

  test('Not allowed to make a move on a square which already is not empty,', () => {
    const game = new Game();

    const move = '00';

    game.nextMove(PLAYER_MARKER_X, move);

    expect(() => game.nextMove(PLAYER_MARKER_Y, move)).toThrow(
      new Error(
        `Player ${PLAYER_MARKER_Y} wants to play move ${move}. This move is already taken on the board. Current board: \n${game.displayBoard()}`
      )
    );
  });

  test('The next player can be asked to make a move', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '12');
    const expectedOutput = `Player ${PLAYER_MARKER_Y} is asked to make a move`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('A move cannot be made when a game is in progress', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '00');
    game.nextMove(PLAYER_MARKER_Y, '21');
    game.nextMove(PLAYER_MARKER_X, '01');

    game.nextMove(PLAYER_MARKER_Y, '22');
    game.nextMove(PLAYER_MARKER_X, '02');

    expect(game.displayGameState()).toBe(`Player ${PLAYER_MARKER_X} has won!`);

    expect(() => game.nextMove(PLAYER_MARKER_Y, '10')).toThrow(
      new Error(`No moves allowed. Current game.state: ${GAME_STATES.WON}`)
    );
  });

  test('Move needs to be made by the next player', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '00');

    const nextMove = '10';

    expect(() => game.nextMove(PLAYER_MARKER_X, nextMove)).toThrow(
      new Error(
        `Player ${PLAYER_MARKER_X} makes move ${nextMove} whilst it is the turn of ${PLAYER_MARKER_Y}`
      )
    );
  });

  test('The game can be won vertically', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '00');
    game.nextMove(PLAYER_MARKER_Y, '02');
    game.nextMove(PLAYER_MARKER_X, '10');
    game.nextMove(PLAYER_MARKER_Y, '01');
    game.nextMove(PLAYER_MARKER_X, '20');

    const expectedOutput = `Player ${PLAYER_MARKER_X} has won!`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won horizontally', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '00');
    game.nextMove(PLAYER_MARKER_Y, '12');
    game.nextMove(PLAYER_MARKER_X, '01');
    game.nextMove(PLAYER_MARKER_Y, '11');
    game.nextMove(PLAYER_MARKER_X, '02');

    const expectedOutput = `Player ${PLAYER_MARKER_X} has won!`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won diagonally (topLeft to bottomRight)', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '00');
    game.nextMove(PLAYER_MARKER_Y, '01');
    game.nextMove(PLAYER_MARKER_X, '11');
    game.nextMove(PLAYER_MARKER_Y, '21');
    game.nextMove(PLAYER_MARKER_X, '22');

    const expectedOutput = `Player ${PLAYER_MARKER_X} has won!`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won diagonally (topRight to bottomLeft)', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '20');
    game.nextMove(PLAYER_MARKER_Y, '01');
    game.nextMove(PLAYER_MARKER_X, '11');
    game.nextMove(PLAYER_MARKER_Y, '21');
    game.nextMove(PLAYER_MARKER_X, '02');

    const expectedOutput = `Player ${PLAYER_MARKER_X} has won!`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won diagonally (topRight to bottomLeft)', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '20');
    game.nextMove(PLAYER_MARKER_Y, '01');
    game.nextMove(PLAYER_MARKER_X, '11');
    game.nextMove(PLAYER_MARKER_Y, '21');
    game.nextMove(PLAYER_MARKER_X, '02');

    const expectedOutput = `Player ${PLAYER_MARKER_X} has won!`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('A tie can be determined', () => {
    const game = new Game();

    game.nextMove(PLAYER_MARKER_X, '00');
    game.nextMove(PLAYER_MARKER_Y, '01');
    game.nextMove(PLAYER_MARKER_X, '02');

    game.nextMove(PLAYER_MARKER_Y, '11');
    game.nextMove(PLAYER_MARKER_X, '10');
    game.nextMove(PLAYER_MARKER_Y, '12');

    game.nextMove(PLAYER_MARKER_X, '21');
    game.nextMove(PLAYER_MARKER_Y, '20');
    game.nextMove(PLAYER_MARKER_X, '22');

    const expectedOutput = `Game is a tie!`;

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game asks players to play until won', () => {
    const game = new Game();

    const expectedOutput = `Player ${PLAYER_MARKER_X} has won!`;

    game.play();
    expect(game.displayGameState()).toBe(expectedOutput);
  });
});
