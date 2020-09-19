import { createStore } from 'redux';
import gameReducer from './reducers/gameReducer';

export const store = createStore(
    gameReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);