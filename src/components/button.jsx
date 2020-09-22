import React from 'react';
import './button.css';

export default props =>{
     return(
        <>
         <button className={`
            button
            ${props.operation ? 'operation' : ''}
            ${props.double ? 'double' : ''}
            ${props.triple ? 'triple' : ''}
         `} onClick={e => props.click && props.click(props.label)}>{props.label}</button>
        </>
     );
}