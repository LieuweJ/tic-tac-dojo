import { Board, Move, PlayerMarker as PlayerMarker } from './Game';

export interface PlayerInterface {
  getDisplayName(): string;
  move: (board: Board, playerMarker: PlayerMarker) => Move;
}

export interface PlayerStrategy {
  move: (board: Board, playerMarker: PlayerMarker) => Move;
}

export class Player implements PlayerInterface {
  strategy: PlayerStrategy;
  displayName: string;

  constructor(name: string, strategy: PlayerStrategy) {
    this.displayName = name;
    this.strategy = strategy;
  }

  public getDisplayName(): string {
    return this.displayName;
  }

  public move(board: Board, currentMarker: PlayerMarker): Move {
    return this.strategy.move(board, currentMarker);
  }
}
