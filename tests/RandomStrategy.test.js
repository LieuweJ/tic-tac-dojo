"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("@/Game");
const RandomStrategy_1 = require("@/RandomStrategy");
describe('RandomStrategy should work', () => {
    test('RandomStrategy returns a move which is on an empty cell on the board.', () => {
        const board = [
            [Game_1.PLAYER_MARKER_X, Game_1.EMPTY_CELL, Game_1.PLAYER_MARKER_O],
            [Game_1.PLAYER_MARKER_X, Game_1.EMPTY_CELL, Game_1.PLAYER_MARKER_X],
            [Game_1.EMPTY_CELL, Game_1.EMPTY_CELL, Game_1.EMPTY_CELL],
        ];
        const strategy = new RandomStrategy_1.RandomStrategy();
        const emptyMovesOnBoard = /01|11|20|21|22/;
        let result = strategy.move(board);
        expect(result).toMatch(emptyMovesOnBoard);
    });
});
