const Square = ({ takeTurn, id, disabled }) => {
  const mark = ["O", "X", "+"];
  // id is the square's number
  // filled tells us if square has been filled
  // tik tells us symbol in square (same as player)
  // We call takeTurn to tell Parent we have filled the square
  const [filled, setFilled] = React.useState(false);
  const [tik, setTik] = React.useState(2);

  return (
    <button
      onClick={() => {
        if (filled || disabled) return;
        setTik(takeTurn(id));
        setFilled(true);
        console.log(`Square: ${id} filled by player : ${tik}`);
      }}
    >
      <h1>{mark[tik]}</h1>
    </button>
  );
};

const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  const [status, setStatus] = React.useState({
    text: "No winner yet.",
    hasWinner: false,
  });
  const [squaresKey, setSquaresKey] = React.useState(0);

  React.useEffect(() => {
    const checkWinner = checkForWinner(gameState);
    console.log("checking for winner ", checkWinner);
    setStatus(checkWinner);
  }, [gameState]);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  const handleResetGame = () => {
    console.log("resetting game");
    setPlayer(1);
    setGameState([]);
    setStatus({
      text: "No winner yet.",
      hasWinner: false,
    });
    setSquaresKey(squaresKey + 1);
  };
  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return (
      <Square
        disabled={status.hasWinner}
        takeTurn={takeTurn}
        key={`${i}_${squaresKey}`}
        id={i}
      ></Square>
    );
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status.hasWinner ? `Winner is ${status.text}` : status.text}</h1>
      </div>
      <br />

      <div id="reset">
        <button disabled={gameState === []} onClick={handleResetGame}>
          New Game
        </button>
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
