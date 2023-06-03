import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import style from '../styles/Init.module.css';

const Init = () => {
    return( 
        <div  className={style.cont}>
       
            <Link to={'/home'} >
                <img  className={style.init}  src="https://64.media.tumblr.com/5636a71fbff0658a6d8babf33f267f67/tumblr_p0d5mg9vGf1wjj45go1_250.gifv" alt='init'/>
            </Link>
        </div>
    );
};
export default Init;