import React from 'react';

import Search from './Search';
import Categories from './Categories';
import logo from './logo.png';

export const SideBar = ()=>{
    return(
        <div>
           <img src={logo} alt="Logo" />
            <Categories/>
            <Search/>
        </div>
    );
};