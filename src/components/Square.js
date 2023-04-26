const Square = props => {
    return (
      <button className="square" onClick={props.onClick} disabled={!props.gameInProgress}>
        {console.log('Square function')}
        {props.value}
      </button>
    );
  };

  export default Square;