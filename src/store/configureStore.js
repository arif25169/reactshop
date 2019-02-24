import {createStore, combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import laptopReducer from '../reducers/laptop';
import LaptopsPage from '../reducers/LaptopsPage';
import LaptopPage from '../reducers/LaptopPage';
import {routerReducer} from 'react-router-redux';
import Basket from '../reducers/Basket';
import Categories from '../reducers/Categories';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default ()=>{
    const store = createStore(
        combineReducers({
            routing:routerReducer,
            laptop: laptopReducer,
            LaptopsPage: LaptopsPage,
            LaptopPage: LaptopPage,
            Basket:Basket,
            Categories: Categories
        }),composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};