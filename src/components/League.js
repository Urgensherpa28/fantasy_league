import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class League extends Component {

    filteredList = () => {
        const uniqueList = this.unique(this.props.players, it => it.name)
        return uniqueList.filter(player => player.team_id === parseInt(this.props.routerProps.match.params.id))
    }

    render() { 
        return (
            <div className='league-2'>
                <div className='container'>
                <Link to={`/teams`} >
                    <img src={this.props.league.logo} alt={this.props.league.name}/>
                </Link>
                <div className='league'>
                    <h3>{this.props.league.name}</h3>
                    <p>{this.props.league.country}</p>
                </div>
                <br></br>
                </div>
            </div>
        )
    }
}
 
export default League;