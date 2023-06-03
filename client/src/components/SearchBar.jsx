import {React, useState }from "react";

import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions";
import style from '../styles/SearchBar.module.css'

const SearchBar = ({setCurrentPage}) =>{
    const dispatch = useDispatch();
    let [name, setName] = useState('');
    
    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    };
    const handleSubmit = event =>{
        event.preventDefault();
        if (name.length !== 0) {
            dispatch(getByName(name));
            setName('');
            dispatch(setCurrentPage(1));
        } else {
            alert("You must enter the exact name of the pokemon");  
        }
    };

    return(
        <div className={style.search}>
            <input onChange={handleInputChange} value={name} type='search'placeholder="Search Pokemon..." name='search'/>
            <button  type='submit' onClick={e =>handleSubmit(e)}>Search</button>
        </div>
    );
}
export default SearchBar;