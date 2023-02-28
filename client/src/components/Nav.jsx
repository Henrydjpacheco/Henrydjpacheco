import React from 'react'; 

import { Link } from 'react-router-dom';
import style from '../styles/Nav.module.css';

const Nav = (handleClick) =>{
    


    return(   
    <div className={style.container}>
        <Link to={'/create'}>
            <button>ADD POKEMON +</button>
        </Link>
        
        <Link to={'/home'}>
            <button onClick={handleClick}>Clean filters</button>
        </Link>
    </div>)
};
export default Nav;