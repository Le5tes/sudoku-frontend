import React from 'react';

export function Square (props)  {
    return <input 
    value={props.value === 0 ? '' : props.value} 
    onChange={(event) => props.onChange(event.target.value)} 
    className="square"/>
}