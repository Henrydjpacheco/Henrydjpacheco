import React from 'react';
import { useDispatch } from 'react-redux';

import { filterByType, filterByLocation } from '../redux/actions';
import style from '../styles/Filter.module.css'

const FilterBy = () => {
    
    const dispatch = useDispatch();
    const handleFilterTypes = (e) =>{
        dispatch(filterByType(e.target.value))
    };
    const handleFilterLocation = (e) => {
        dispatch(filterByLocation(e.target.value));
    };
    return(
        <div className={style.container}>
            <p>Filter By:</p>
            <div>
                <select onChange={e => handleFilterTypes(e)}>
                    <option value='title'>Types</option>
                    <option value='ALL'>All Types</option>
                    <option value='normal'>Normal</option>
                    <option value='fighting'>Fighting</option>
                    <option value='flying'>Flying</option>
                    <option value='poison'>Poison</option>
                    <option value='ground'>Ground</option>
                    <option value='rock'>Rock</option>
                    <option value='bug'>Bug</option>
                    <option value='ghost'>Ghost</option>
                    <option value='steel'>Steel</option>
                    <option value='fire'>Fire</option>
                    <option value='water'>Water</option>
                    <option value='grass'>Grass</option>
                    <option value='electric'>Electric</option>
                    <option value='psychic'>Psychic</option>
                    <option value='ice'>Ice</option>
                    <option value='dragon'>Dragon</option>
                    <option value='dark'>Dark</option>
                    <option value='fairy'>Fairy</option>
                    <option value='unknown'>Unknown</option>
                    <option value='shadow'>Shadow</option>
                </select>
            </div>
            <div>
                <select onChange={e => handleFilterLocation(e)}>
                    <option value='title'>Data loaction</option>
                    <option value='ALL'>All Locations</option>
                    <option value='api'>From external API</option>
                    <option value='db'>From Database</option>
                </select>
            </div>
        </div>
    )
}; 

export default FilterBy;

