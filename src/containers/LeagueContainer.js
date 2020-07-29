import React, { Component } from 'react';
import League from '../components/League'

class LeagueContainer extends Component {
    
    render() { 
        // console.log(this.props.leagues)
        return (
            <div className='league'>
                <h1>Leagues</h1>
                <div className='container'>
                {this.props.leagues.map(league => {
                       return <League league={league} key={league.id}/>
                })}
                </div>
            </div>
        )
    }
}
 
export default LeagueContainer;