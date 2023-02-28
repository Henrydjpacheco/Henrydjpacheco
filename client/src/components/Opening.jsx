import React, {useState, useEffect} from 'react';
import style from '../styles/Opening.module.css';
import  opening from '../img/init.gif'
import { useHistory } from 'react-router-dom';

const Opening = () => {
    const redirectUrl = "/init"
    const [showImage, setShowImage] = useState(true);
    const history = useHistory();
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowImage(false);
            history.push(redirectUrl);
        }, 7330);
    
        return () => {
            clearTimeout(timeoutId);
        };
    }, [history, redirectUrl]);
    return( 
        <div  className={style.open}>
            { showImage && <img  className={style.opening}  src={opening} alt='opening'/>}   
        </div>
    );

};
export default Opening;