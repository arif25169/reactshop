import React from 'react';
import { SideBar } from './SideBar';
import BasketCart from './BasketCart';

const Layout = ({ children }) => {
    return (
        <div className="view-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <SideBar />
                    </div>
                    <div className="col-md-9">
                        <BasketCart />
                        {children}
                    </div>
                </div>
                <footer>
  <p>© Arif Hasan <a href="mailto: arif25169@gmail.com">
  arif25169@gmail.com</a>.</p>
</footer>
            </div>
        </div>
    )
};

export default Layout;