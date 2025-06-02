import { PLAYER_MARKER_X, PLAYER_MARKER_O, Game, Move } from '../src/Game';
import { Player, PlayerInterface, PlayerStrategy } from '../src/Player';

class TestStrategyWithPredictedMoves implements PlayerStrategy {
  private fifoMoves: Move[];
  private playerName: string;

  constructor(fifoMoves: Move[], playerMarker: string) {
    this.fifoMoves = fifoMoves;
    this.playerName = playerMarker;
  }

  public move(): Move {
    const nextMove = this.fifoMoves.pop();

    if (typeof nextMove === 'undefined') {
      throw Error(`[TestStrategyWithPredictedMoves]: No more moves for ${this.playerName}`);
    }

    return nextMove;
  }
}

function createPlayerWithMoves(moves: Move[], playerName: string): PlayerInterface {
  return new Player(playerName, new TestStrategyWithPredictedMoves(moves, playerName));
}

describe('Tic-tac-toe game should work', () => {
  // test('Empty board should be displayed', () => {
  //   const game = new Game({
  //     player1: createPlayerWithMoves([], 'player 1'),
  //     player2: createPlayerWithMoves([], 'player 2'),
  //   });
  //
  //   const expectedOutput =
  //     `   |   |   ` + `\n-----------\n` + `   |   |   ` + `\n-----------\n` + `   |   |   `;
  //
  //   let result = game.displayBoard();
  //
  //   expect(result).toBe(expectedOutput);
  // });

  // test('A player can make a move', () => {
  //   const game = new Game({
  //     player1: createPlayerWithMoves(['12'], 'player 1'),
  //     player2: createPlayerWithMoves([], 'player 2'),
  //   });
  //
  //   const expectedOutput =
  //     `   |   |   ` + `\n-----------\n` + `   |   | X ` + `\n-----------\n` + `   |   |   `;
  //
  //   game.play();
  //
  //   let result = game.displayBoard();
  //
  //   expect(result).toBe(expectedOutput);
  // });

  test('Player cannot make a move which is outside of the board (vertically)', () => {
    const expectedPlayerName = 'Johnny Crash';
    const game = new Game({
      // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
      player1: createPlayerWithMoves(['42'], expectedPlayerName),
      player2: createPlayerWithMoves([], 'player 2'),
    });

    expect(() => game.play()).toThrow(new Error(`Move has incorrect row: 4`));

    expect(game.displayGameState()).toBe(
      `It is player ${expectedPlayerName}'s (playing with ${PLAYER_MARKER_X}) turn`
    );
  });

  test('Player cannot make a move which is outside of the board (horizontally)', () => {
    const game = new Game({
      // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
      player1: createPlayerWithMoves(['24'], 'player 1'),
      player2: createPlayerWithMoves([], 'player 2'),
    });

    expect(() => game.play()).toThrow(new Error(`Move has incorrect col: 4`));
  });

  test('A move can only consist of a string with 2 numbers', () => {
    const incorrectMove = '110';

    const game = new Game({
      // @ts-expect-error player passes an invalid 'move', to test if the Javascript guard fails
      player1: createPlayerWithMoves([incorrectMove], 'player 1'),
      player2: createPlayerWithMoves([], 'player 2'),
    });

    expect(() => game.play()).toThrow(new Error(`Move is of incorrect format: ${incorrectMove}`));
  });

  test('Not allowed to make a move on a square which already is not empty,', () => {
    const sameMove = '01';

    const game = new Game({
      player1: createPlayerWithMoves([sameMove], 'player 1'),
      player2: createPlayerWithMoves([sameMove], 'player 2'),
    });

    expect(() => game.play()).toThrow(
      new Error(
        `Player ${PLAYER_MARKER_O} wants to play move ${sameMove}. This move is already taken on the board.`
      )
    );
  });

  // test('The next player can be asked to make a move', () => {
  //   const game = new Game({
  //     player1: createPlayerWithMoves([], 'player 1'),
  //     player2: createPlayerWithMoves([], 'player 2'),
  //   });
  //
  //   game._nextMove(PLAYER_MARKER_X, '12');
  //   const expectedOutput = `Player ${PLAYER_MARKER_Y} is asked to make a move`;
  //
  //   expect(game.displayGameState()).toBe(expectedOutput);
  // });

  test.skip('A move cannot be made when a game is not in progress', () => {
    //   const game = new Game({
    //     player1: createPlayerWithMoves([], 'player 1'),
    //     player2: createPlayerWithMoves([], 'player 2'),
    //   });
    //
    //   game._nextMove(PLAYER_MARKER_X, '00');
    //   game._nextMove(PLAYER_MARKER_Y, '21');
    //   game._nextMove(PLAYER_MARKER_X, '01');
    //
    //   game._nextMove(PLAYER_MARKER_Y, '22');
    //   game._nextMove(PLAYER_MARKER_X, '02');
    //
    //   expect(game.displayGameState()).toBe(`Player ${PLAYER_MARKER_X} has won!`);
    //
    //   expect(() => game._nextMove(PLAYER_MARKER_Y, '10')).toThrow(
    //     new Error(`No moves allowed. Current game.state: ${GAME_STATES.WON}`)
    //   );
  });

  test('The game can be won vertically', () => {
    const winnerName = 'John Doe';

    const game = new Game({
      player1: createPlayerWithMoves(['00', '10', '20'], winnerName),
      player2: createPlayerWithMoves(['02', '01'], 'Mary'),
    });

    const expectedOutput = `Player ${winnerName} (${PLAYER_MARKER_X}) has won!`;

    game.play();

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won horizontally', () => {
    const winnerName = 'John Doe';

    const game = new Game({
      player1: createPlayerWithMoves(['00', '01', '02'], winnerName),
      player2: createPlayerWithMoves(['12', '11'], 'Mary'),
    });

    const expectedOutput = `Player ${winnerName} (${PLAYER_MARKER_X}) has won!`;

    game.play();
    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won diagonally (topLeft to bottomRight)', () => {
    const winnerName = 'Mary';

    const game = new Game({
      player1: createPlayerWithMoves(['01', '21', '02'], 'John Doe'),
      player2: createPlayerWithMoves(['00', '11', '22'], winnerName),
    });

    const expectedOutput = `Player ${winnerName} (${PLAYER_MARKER_O}) has won!`;

    game.play();

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('The game can be won diagonally (topRight to bottomLeft)', () => {
    const winnerName = 'Mary';

    const game = new Game({
      player1: createPlayerWithMoves(['01', '21', '12'], 'John Doe'),
      player2: createPlayerWithMoves(['11', '02', '20'], winnerName),
    });

    const expectedOutput = `Player ${winnerName} (${PLAYER_MARKER_O}) has won!`;

    game.play();

    expect(game.displayGameState()).toBe(expectedOutput);
  });

  test('A tie can be determined', () => {
    const game = new Game({
      player1: createPlayerWithMoves(['00', '02', '10', '21', '22'], 'player 1'),
      player2: createPlayerWithMoves(['01', '11', '12', '20'], 'player 2'),
    });

    const expectedOutput = `Game is a tie!`;

    game.play();

    expect(game.displayGameState()).toBe(expectedOutput);
  });
});
