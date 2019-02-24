import './main.css'
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {browserHistory,Router,Route} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Layout from './Containers/Layout';
import Laptops from './Containers/Laptops';
import Laptop from './Containers/Laptop';
import Basket from './Containers/Basket';
import 'react-toastify/dist/ReactToastify.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory,store);
const jsx = (
    <Provider store={store}>
       <Router history={history}>
            <Route component={Layout}>
                <Route path='/' component={Laptops}></Route>
                <Route path='/categories/:id' component={Laptops} />
            </Route>
            <Route path="/Laptops/:id" component={Laptop} />
            <Route path="/basket" component={Basket} />
            
       </Router>
    </Provider>
);




ReactDOM.render(jsx,document.getElementById('root'));

