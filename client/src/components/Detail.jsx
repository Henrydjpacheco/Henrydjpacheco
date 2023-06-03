import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { clearDetail, getDetail } from '../redux/actions';
import Loading from './Loading.jsx';

import style from '../styles/Detail.module.css';


const Detail = ( ) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    useEffect(() => {
        dispatch(getDetail(id));
        return () => dispatch(clearDetail())
    }, [dispatch, id]);

    let detail = useSelector(state => state.detail);
    return(<div>
        <Link to="/home"> <button>◀Back</button> </Link>
        <div className={style.wra}>
            
            {
            !detail[0] ?  <Loading/> :  
            <div className={style.container}>
                <div className={style.photo}>
                    <img src={detail[0]?.image} alt='no fund'/>
                </div>
                <div className={style.skills}>
                    <h1>{detail[0]?.name}</h1>
                    <br/>
                    <div className={style.stats}>
                    <div className={style.health}>
                        <h4>Health:  {detail[0]?.health}/{detail[0]?.health}</h4>
                    </div>
                    <div className={style.defense}>
                        <h4>Defense: {detail[0]?.defense}</h4>
                    </div>
                    <div className={style.attack}>
                        <h4>Attack: {detail[0]?.attack}</h4>
                    </div>
                    <div className={style.speed}>
                        <h4>Speed: {detail[0]?.speed}</h4>
                    </div>
                    </div>
                    <div className={style.others}>
                    <h4>Height: {detail[0]?.height}m</h4>
                    <h4>Weigth: {detail[0]?.weight}Kg.</h4>
                        <div className={style.types}>
                            <h4>Types: {detail[0]?.types.join(', ')}.</h4>
                        </div>
                    </div>
                    
                    
                </div>  
            </div>
            }
        </div>
        
        </div>
    );
}

export default Detail;