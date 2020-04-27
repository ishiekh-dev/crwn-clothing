import { createStore, applyMiddleware } from "redux";
//  using logger to debug redux in development mode
import logger from "redux-logger";

import createSagaMiddleware from 'redux-saga'
import { fetchCollectionsStart } from './shop/shop.sagas'
// this to persist the store
import { persistStore } from "redux-persist";
import rootReducer from "./root-reducer";
const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(fetchCollectionsStart)
    // this presistence version of our store
export const persistor = persistStore(store);
export default { store, persistor };