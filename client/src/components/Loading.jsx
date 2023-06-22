import React from 'react';
import loading from '../img/pokeball.png';
import style from '../styles/Loading.module.css';

const Loading = () => {
    return( 
        <div className={style.contLoading}>
            <img  className={style.loading}  src={loading} alt='loading...'></img>
        </div>
    );

};
export default Loading;