import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';

import SearchBar from './SearchBar';
import Card from './Card';
import Nav from './Nav';
import Loading from './Loading';
import FilterBy from './FilterBy.jsx';

import style from '../styles/Home.module.css'
import Paginated from '../pages/Paginated.jsx'
import { getAllPokemon, getTypes, sortByName, sortByAttack } from '../redux/actions'

const Home = () => {    
    const allPokemon = useSelector(state => state.pokemon);
    const [reload, setReload] = useState('')
    const dispatch = useDispatch();
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ pokemonPerPage, setPokemonPerPage ] = useState(12);
    const paginated = (pageNumber) => { setCurrentPage(pageNumber)};
    const indexOfLastPokemon = currentPage * pokemonPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = allPokemon?.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const handleClick = event =>{
        event.preventDefault();
        dispatch(getAllPokemon(),
        getTypes())
    };
    const refresh = (flag) => {
        setReload(flag)
        return reload;
    };
    const handleSortName = (e) =>{
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setCurrentPage(1);
        refresh(e.target.value);
    }
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
            <h1>Pokedex<br/></h1>
            <div className={style.top}>
                <div className={style.search}>
                <SearchBar/> 
                <Nav handleClick={handleClick}/> 
            </div>       
            <div className={style.contNav}>
                <div className={style.order}>
                    <FilterBy refresh={refresh}/> 
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
            <div className = {style.cards} >
                {
                    !allPokemon[0] ?  <Loading/> :  currentPokemon?.map(poke => (
                            <Link to={'/home/'+poke.id} key={poke.id} id={poke.id} >
                                <Card image={poke.image} name={poke.name} id={poke.id} types={poke.types} />
                            </Link> 
                        )
                    )
                }
            </div>
            <Paginated pokemonPerPage={pokemonPerPage} allPokemon={allPokemon.length} paginated={paginated} />           
        </div>
    )
};
export default Home;