import React from 'react';
import style from '../styles/Loading.module.css';
import  loading from '../img/pokeball.png'

const Loading = () => {
    return( 
        <div >
            <img  className={style.loading}  src={loading} alt='loading...'></img>
        </div>
    );

};
export default Loading;