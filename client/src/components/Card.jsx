import React from 'react';
import { Link } from 'react-router-dom';
import style from '../styles/Card.module.css';

export const Card = ({id, name, image, types}) => {
    return(
        <div className={style.card}>   
            <div >
                <Link to={`/home/${id}`} className={style.to}>
                    <img className={style.banner} src={image} alt={image} />
                </Link>
            </div>
            <div className={style.description}>
                <h5>{name}</h5>
                <p>{types.join(', ')}</p>
            </div>
        </div>
    )
};
export default Card;
