"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("@/Player");
const Game_1 = require("@/Game");
const TestStrategy = class TestStrategy {
    constructor(expectedMove) {
        this.expectedMove = expectedMove;
    }
    move() {
        return this.expectedMove;
    }
};
describe('Player should work', () => {
    test('Player makes a move', () => {
        const expectedOutput = '00';
        const strategy = new TestStrategy(expectedOutput);
        const player = new Player_1.Player('John Doe', strategy);
        const board = [
            [Game_1.PLAYER_MARKER_X, Game_1.EMPTY_CELL, Game_1.PLAYER_MARKER_O],
            [Game_1.PLAYER_MARKER_X, Game_1.EMPTY_CELL, Game_1.PLAYER_MARKER_X],
            [Game_1.EMPTY_CELL, Game_1.EMPTY_CELL, Game_1.EMPTY_CELL],
        ];
        let result = player.move(board, Game_1.PLAYER_MARKER_X);
        expect(result).toBe(expectedOutput);
    });
    test('Player has a displayName a move', () => {
        const strategy = new TestStrategy('00');
        const expectedOutput = 'John Doe';
        const player = new Player_1.Player(expectedOutput, strategy);
        let result = player.getDisplayName();
        expect(result).toBe(expectedOutput);
    });
});
