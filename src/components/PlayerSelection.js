const PlayerSelection = props => {
    return (
      <div>
        <div>
          <input type="text" value={props.player1} placeholder={"Enter player 1 name"} onInput={props.player1Input} disabled={props.gameInProgress} />
        </div>
        <div>
          <input type="text" value={props.player2} placeholder={"Enter player 2 name"} onInput={props.player2Input} disabled={props.gameInProgress} />
        </div>
        <div>
          <button type="button" onClick={props.startGame} disabled={props.gameInProgress}>Start Game!</button>
        </div>
        <div>
          <label className="error">{props.error}</label>
        </div>
      </div>
    );
  };

  export default PlayerSelection;