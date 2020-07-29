import React from 'react';
import { Link } from 'react-router-dom';
import Player from './Player';

const Club = (props) => { 

    return (
        <div className='container-2'>
            <div className='container'>
        <Link to={`/teams/${props.team.id}`} >
            <div className='container-2'>
            <h3>{props.team.name} </h3> 
            <br></br>
            </div>
        </Link>
            <img src={props.team.logo} alt={props.team.name} />
            <p><b>Stadium: </b>{props.team.stadium}</p>
            <p><b>Location: </b>{props.team.city}</p>
            <br></br>
            </div>
        </div>
    )

} 

export default Club;