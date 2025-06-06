import { Player } from './Player';
import { RandomStrategy } from './RandomStrategy';
import { Game } from './Game';

const player1 = new Player('John', new RandomStrategy());
const player2 = new Player('Mary', new RandomStrategy());

const game = new Game({ player1, player2 });

game.play();
