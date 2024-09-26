import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import ticketsReducer from './tickets';
import statusReducer from './status';
import clientsReducer from './clients';

const rootReducer = combineReducers({
  session: sessionReducer,
  tickets: ticketsReducer,
  status: statusReducer,
  clients: clientsReducer
});

let enhancer;
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;