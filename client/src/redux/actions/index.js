import axios from 'axios';

export const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_BY_NAME = 'GET_BY_NAME';
export const POST_POKEMON = 'POST_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_DATA_UBICATION = 'FILTER_BY_DATA_UBICATION';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const SORT_BY_ATTACK = 'SORT_BY_ATTACK';

export const getAllPokemon = () => async dispatch => {
    const {data} = await axios.get('https://pokedex-app-production-052b.up.railway.app/pokemon');
    return dispatch({
        type: 'GET_ALL_POKEMON',
        payload: data
    });
};
export const getDetail = id => async dispatch => {
    const {data} = await axios.get(`https://pokedex-app-production-052b.up.railway.app/pokemon/${id}`)
    return dispatch({
        
        type:'GET_DETAIL',
        payload: data

    });
};
export const getByName = name => async dispatch => {
    try {
        const {data} = await axios(`https://pokedex-app-production-052b.up.railway.app/pokemon?name=${name}`);
        return dispatch({
            type: 'GET_BY_NAME',
            payload: data
        });
    }
    catch(err){
        console.log(err);
    }
};
export const getTypes = () => async dispatch => {
    let { data } = await axios('https://pokedex-app-production-052b.up.railway.app/types');
        return dispatch({
            type: 'GET_TYPES',
            payload: data
        }
    )
};
export const postPokemon = body => async dispatch => {
    const { data } = await axios.post('https://pokedex-app-production-052b.up.railway.app/pokemon', body)
    return dispatch({
        type: 'POST_POKEMON',
        payload: data
    })
};
export const  filterByType = payload => {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    };
};

export const filterByLocation = payload => {
    return {
        type: 'FILTER_BY_DATA_UBICATION',
        payload
    }
};

export const sortByName = payload => {
    return {
        type: 'SORT_BY_NAME',
        payload
    };
};

export const sortByAttack = payload => {
    return {
        type: 'SORT_BY_ATTACK',
        payload
    };

};