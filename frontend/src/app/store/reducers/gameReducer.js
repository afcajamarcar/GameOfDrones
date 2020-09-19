const initialState = {
    _id: '',
    playerOne: '',
    playerTwo: '',
    rounds: [],
    winner: ''
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'STORE_CURRENT_GAME':
          return state = {
            ...state,
            _id: action.payload._id,
            playerOne: action.payload.playerOne,
            playerTwo: action.payload.playerTwo,
            winner: action.payload.winner,
            rounds: action.payload.rounds
          }
      default:
        return state;
    }
  }

  export default reducer;