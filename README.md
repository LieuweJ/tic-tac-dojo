# Tic Tac Dojo

This game can be run by this command:
`npm run tic-tac-dojo`

## Code structure.
We have classes with the types/interfaces `Game`, `Player` and `Strategy`.

### Class type "Game"
The `Game` class should be seen as a Singleton (although not enforced here). It is responsible for:
- Handling the board state
- Handling the 'which player belongs to which token (X or O)'
- Handling the game state (won/tied)
- Handling the next turn until game is finished.
- Handling the printing of the game and board state.

### Class type "Player"
In order for the `Game` to work with Players, we use an interface for `Player` classes.

The `Player` class is responsible for:
- Player state (name)
- Which next move to make on the board

### Class type "PlayerStrategy"
The `PlayerStrategy` class is responsible for:
- Determining the best next move to make.

Any Player can have any PlayerStrategy. In order to do so, we use an interface for strategy classes.

As POC to prove the extendability of this strategy pattern, we introduced the 'RandomStrategy' 
