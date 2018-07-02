import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers/reducers.js';

export default function configureStore() {
    const store = createStore(reducers,applyMiddleware(thunkMiddleware) );
    return store
}
