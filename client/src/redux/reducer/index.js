import {  GET_DETAIL, GET_BY_NAME, GET_TYPES,POST_POKEMON, FILTER_BY_TYPE, FILTER_BY_DATA_UBICATION, SORT_BY_NAME, SORT_BY_ATTACK, CLEAR } from '../actions';
import { GET_ALL_POKEMON } from '../actions';
const initialState = {
    pokemon: [],
    allPokemon: [],
    types: [],
    detail: []
};

const rootReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMON:
            return {
                ...state,
                pokemon: action.payload,
                allPokemon: action.payload
            };

        case GET_BY_NAME: 
        return {
            ...state,
            pokemon: action.payload
        }

        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            };
        case POST_POKEMON:
            return {
                ...state,
                pokemon: [...state.pokemon, action.payload]
            }

        case FILTER_BY_TYPE:
            const listPokemon = state.allPokemon;
            const typesFiltered = action.payload ==='ALL' ? listPokemon : listPokemon.filter(poke => poke.types.includes(action.payload));
            return {
                ...state,
                pokemon: typesFiltered 
            };
            
        case FILTER_BY_DATA_UBICATION:
            const pokemon= state.allPokemon;
            const locationFiltered = action.payload === 'db' ? pokemon.filter(poke => poke.CreatedInDb)  : pokemon.filter(poke => !poke.CreatedInDb);
            return {
                ...state,
                pokemon: action.payload === 'ALL' ? state.pokemon : locationFiltered
            };

        case SORT_BY_NAME:
            let  sortName = action.payload === 'asc' ? state.pokemon.sort((a, b) => {
                if(a.name > b.name) return 1;
                if(a.name < b.name) return -1;
                return 0;
            }) : state.pokemon.sort((a, b) => {
                if(a.name > b.name) return -1;
                if(a.name < b.name) return 1;
                return 0;
            });
            return {
                ...state,
                pokemon: sortName
            };   

        case SORT_BY_ATTACK:
            let sortAttack = action.payload === 'min' ? state.pokemon.sort((a, b) => {
                if (a.attack > b.attack) return 1;
                if (a.attack  < b.attack ) return -1;
            
                return 0;
            })
            : state.pokemon.sort((a, b) => {
                if (a.attack  > b.attack ) return -1;
                if (a.attack  < b.attack ) return 1;
            
                return 0;
                });
            return {
                ...state,
                pokemon : sortAttack
            };
        case CLEAR:
            return {
                ...state,
                detail: []
            }

        default: return state;
    };
};

export default rootReducer;