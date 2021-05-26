import React from 'react'
const Error = (props) => (
    <div className='center rojo'>
        <h2>
            Error
        </h2>
        <p>
            {props.error}
        </p>         
    </div>
);

export default Error;