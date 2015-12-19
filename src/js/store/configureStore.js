import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger();

export default function configureStore() {
  const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}
