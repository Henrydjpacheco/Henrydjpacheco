import React, { useEffect, useState} from 'react';
import { Link, useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemon, getTypes, postPokemon } from '../redux/actions';
import style from '../styles/Create.module.css';



const Create = () => {
  const pokemon = useSelector(state => state.pokemon)
  const dispatch = useDispatch()
  const [errors, setErrors] = useState("");
  const types = useSelector(state => state.types);   
  const history = useHistory();
  const [input, setInput] = useState(
    {
      name: '',
      image: '',
      health: 0,
      defense: 0,
      attack:0,
      speed: 0,
      height:0,
      weight: 0,
      types: []
    }
  );

  useEffect(() => {
    if (types.length === 0) {
        dispatch(getTypes())
        dispatch(getAllPokemon())
    }
  }, [dispatch, types, pokemon]
  );
  const handleInputChange = e => {
    e.preventDefault();
      setInput({
          ...input,
          [e.target.name]: e.target.value,
      });
      setErrors(
        setInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSelect = e => {
    let selectedType = e.target.value
    if (!input.types.includes(selectedType) && input.types.length < 5) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        });
    };
  };

  const handleDelete = e => {
    e.preventDefault()
    setInput({
        ...input,
        types: input.types.filter(type => type !== e.target.value)
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if( !input.name.trim() && !input.image && input.health === 0 && input.attack === 0  && input.defense === 0 && !input.types[0]) {
      setErrors("Please, complete the fields , for the creation of the pokemon");
    }
    else if (!input.name.trim() ){
      setErrors("Please, enter a name for your pokemon");
    }
    else if ( !pokemon.includes(input.name)){
      setErrors("This name is not available"); 
    }
    else if(!/^[a-zA-z]+$/.test(input.name)){
      setErrors("Please,only alphabet characters ")
    }
    else if(!input.image){
      setErrors("Please, enter the url of the image of your pokemon");
    }
  
    else if(input.health === 0){
      setErrors("Please, select a value other than 0 for your pokemon's health");
    }

    else if (input.attack === 0){
      setErrors("Please, select a value other than 0 for your pokemon's attack");
    }
    else if (input.defense === 0){
      setErrors("Please, select a value other than 0 for your pokemon's defense");
    }
    else if (input.types.length === 0){
      setErrors("Please select at least one type for your pokemon")
    }
    else{
      dispatch(postPokemon(input));
        alert("the pokemon has been created")
        history.push("/home")
      }
    }; 

  return (
    <div className={style.wrap}>
      <div className={style.tp}>
        <Link to="/home">
          <button>  ◀Back</button>
        </Link>
        <h1>Create a pokemon</h1>
      </div>
      <form>
        <div className={style.rows}>
          <div className={style.colum1}>
              <div className={style.box}>
                <div className={style.name}>
                  <label htmlFor="name">Name: </label>
                  <input id="name" type="text" placeholder='' name="name" value={input.name}  onChange={e => handleInputChange(e)} />
                </div>
      
                <div className={style.img}>
                  <label htmlFor="image">Image: </label>
                  <input type="text" key="image" id="image"  placeholder="img...url"  name="image" value={input.image} onChange={e => handleInputChange(e)}/>
                </div>
              </div>
              <div className={style.hp}>
                <label htmlFor="health">Health </label>
                <input type="range" key="health" id="health" name="health" min="0" max='255' value={input.health} onChange={e => handleInputChange(e)}/>
                <h3>{input.health}/{input.health}</h3>
              </div>
              <div className={style.attack}>
                <label htmlFor="attk">Attack</label>
                <input key="attack" id="attk" type="range" name="attack" min="0" max='255' value={input.attack} onChange={e => handleInputChange(e)}/>
                <h3>{input.attack}</h3>
              </div>
              <div className={style.dfs}>
                <label>Defense </label>
                <input type="range" name="defense" min="0" max='255' value={input.defense} onChange={e => handleInputChange(e)}/>
                <h3>{input.defense}</h3>
              </div>  
              <div className={style.speed}>
                <label>Speed </label>
                <input type="range" min="0" max="255" name="speed" value={input.speed} onChange={e => handleInputChange(e)}/>
                <h3>{input.speed}</h3>
              </div>
            </div>
            <div className={style.colum2}>
              <div className={style.stats}>
                <label htmlFor="height">Height:</label>
                <input type="number" id="height" value={input.height}  name="height" onChange={e => handleInputChange(e)} />
                <label>Weight: </label>
                <input type="number" id="weight" value={input.weight}  name="weight" onChange={e => handleInputChange(e)} />
              </div>
              <div>
                <h4>Types:</h4>
                <div className={style.typesContainer}>
                  <div className={style.type}>
                    <select name="types" value={input.types} multiple={true} onChange={(e => handleSelect(e))}>
                      {
                        types && types.map( type => {
                          return(
                            <option  key={type.name} value={type.name} >{type.name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className={style.renderTypes}>
                    {
                      input.types.map(type =>{
                        return(
                          <div className={style.type} key={type.name}>
                            <span>{type}</span><button type="button" value={type} onClick={e => handleDelete(e)}   >x</button>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>   
          <div className={style.error}>
            {errors ? <span>{errors}</span> : null}
          </div>
          <div className={style.submit}>
            <button type='submit' onClick={e => handleSubmit(e)}>Create</button>
          </div>
        </form>
    </div>
  )
};

export default Create;