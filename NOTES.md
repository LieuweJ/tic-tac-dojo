✅ DONE
- board can be displayed in a grid
- move can be made by player
- next player can make a move when game is in progress
- the game can be won vertically
- Move needs to be made by the next player.
- The game can be won horizontally
- The player cannot make a move outside the board (vertically)
- The player cannot make a move outside the board (horizontally)
- A player move can only consist of a string with 2 number.
- The game can be won diagonally (topLeft to bottomRight)
- The game can be won diagonally (topRight to bottomLeft)
- Move cannot be made on a square which is already taken.
- A move cannot be made when the game is not in progress
- Tie can be determined

- R: rename Player_1, Player_2 to something like PlayerMarker.
- R: Use a type for the board, other than string

- Player can make a move
- Player can use a strategy called "Random". This random strategy returns a move which is on an empty cell on the board.
 
- R: Refactor index.ts: Rename file and class in file.

- Game asks players to move until won.
- R: Only make the 'makeMove method' a private method.
- Game asks players to move until tie.
- R: Refactor 'makeMove' to only make the move, move more logic to method 'Play'
- Player should have a displayName
- Game should communicate win with name of player, rather than X / O

🚧 WIP


⚠️ TODO
- Game should communicate tie with name of player, rather than X / O
- 
🅿️ PARKED
