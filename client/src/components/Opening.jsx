import React, {useState, useEffect} from 'react';
import style from '../styles/Opening.module.css';
import  opening from '../img/init.gif'
import { useHistory } from 'react-router-dom';

const Opening = () => {
    const redirectUrl = "/init"
    const [showImage, setShowImage] = useState(true);
    const history = useHistory();
    useEffect(() => {
        const timeoutId = setTimeout(() => { //despues de 7.3s settea a flase el estado de showImage pushea al array del Obj history la constante redicUrl que contiene la ruta del componente de inicio 
            setShowImage(false);
            history.push(redirectUrl);
        }, 7330);
    
        return () => {
            clearTimeout(timeoutId); //desmonta el coponente con el metodo clearTimeout que borra el retraso aplicado por setTimeout si el coponente se desmonta antes de que termine la cuenta regresiva
        };
    }, [history, redirectUrl]);//se asegura que useEffect tenga acceso actualizado a ambas variables en cada ejecución.
    return( 
        <div  className={style.open}>
            { showImage && <img  className={style.opening}  src={opening} alt='opening'/>}   
        </div>
    );

};
export default Opening;