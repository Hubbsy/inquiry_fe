import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers/rootReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

export default function configureStore() {
    const bindMiddleware = (middleware) => {
        if (process.env.NODE_ENV !== 'production') {
            return composeWithDevTools(applyMiddleware(middleware));
        } else {
            return applyMiddleware(middleware);
        }
    };

    const store = createStore(rootReducer, bindMiddleware(thunk));

    return store;
}
