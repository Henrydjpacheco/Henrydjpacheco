import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Paginated from '../pages/Paginated.jsx';
import { getAllPokemon, getTypes, sortByAttack, sortByName } from '../redux/actions';
import style from '../styles/Home.module.css';
import Card from './Card';
import FilterBy from './FilterBy.jsx';
import Loading from './Loading';
import SearchBar from './SearchBar';

const Home = () => {    

    const dispatch = useDispatch();
    const allPokemon = useSelector(state => state.pokemon);
    const [reload, setReload] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonPerPage ] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = allPokemon?.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginated = pageNumber => { 
        setCurrentPage(pageNumber)
    };
    const refresh = (flag) => {
        setReload(flag)
        return reload;
    };
    const handleClick = event =>{
        event.preventDefault();
        dispatch(getAllPokemon(),
        getTypes())
    };
    const handleSortName = (e) =>{
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        refresh(e.target.value);
    };
    const handleSortAttack = (e) =>{
        e.preventDefault();
        dispatch(sortByAttack(e.target.value));         
        setCurrentPage(1);
        refresh(e.target.value);    
    };
    useEffect(() => {   
        dispatch(getAllPokemon());
        dispatch(getTypes());
        },[dispatch]);
    
    return(
        <div className={style.container}>
            <header>
            <Link to={'/home'}>
            <h1>Pokedex<br/></h1>
            </Link>
            
            <div className={style.top}>
                <div className={style.search}>
                    <SearchBar setCurrentPage={setCurrentPage}/>  
                    <div className={style.btn}>
                    <Link to={'/create'}>
                        <button>ADD POKEMON +</button>
                    </Link>
                    
                    <Link to={'/home'}>
                        <button onClick={handleClick}>Home</button>
                    </Link>
                </div>
            </div>       
            <div className={style.contNav}>
                <div className={style.order}>
                    <FilterBy setCurrentPage={setCurrentPage} refresh={refresh}/> 
                    <div className={style.sort}>
                        <p>Sort By:</p>
                            <div>
                                <select onChange={e => handleSortName(e)} >
                                    <option value='asc'>A to Z</option>
                                    <option value='desc'>Z to A</option>
                                </select>
                                <select onChange={e => handleSortAttack(e)}>
                                    <option value='none'>Attack</option>
                                    <option value='max'>Max to Min</option>
                                    <option value='min'>Min to Max</option>
                                </select>
                            </div>
                    </div>
                </div>
            </div>        
            </div>   
            </header>            
            <div className = {style.cardContainer} >
                {
                    !allPokemon[0] ?  <Loading /> : <div className = {style.cards}> {currentPokemon?.map(poke => (
                            <Link to={'/home/'+poke.id} key={poke.id} id={poke.id} >
                                <Card image={poke.image} name={poke.name} id={poke.id} types={poke.types} />
                            </Link> 
                        )
                    )
                    }</div>
                }
            </div>
            <Paginated  currentPage={currentPage} pokemonPerPage={pokemonPerPage} allPokemon={allPokemon.length} paginated={paginated} />           
        </div>
    )
};
export default Home;