import { Board, Move, PlayerMarker as PlayerMarker } from '@/Game';

export interface PlayerInterface {
  move: (board: Board, playerMarker: PlayerMarker) => Move;
}

export interface PlayerStrategy {
  move: (board: Board, playerMarker: PlayerMarker) => Move;
}

export class Player implements PlayerInterface {
  strategy: PlayerStrategy;
  constructor(strategy: PlayerStrategy) {
    this.strategy = strategy;
  }

  public move(board: Board, currentMarker: PlayerMarker): Move {
    return this.strategy.move(board, currentMarker);
  }
}
