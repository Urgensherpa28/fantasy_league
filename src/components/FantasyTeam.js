import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class FantasyTeam extends Component {

    sendPlayers = () => {
        this.props.history.push('/leagues')
    }

    handleDelete = (e) => {
        console.log('clicked')
        e.preventDefault()
        fetch(`http://localhost:3000/fantasy_teams/${this.props.team.id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.token
            },
        })
        .then(res => res.json())
        .then(remove => {
            this.props.getTeams(remove)
        })
    }

    render() { 
        const {name, fantasy_players} = this.props.team

        const arrayOfPlayers = fantasy_players.map(player => {
           return <p>{player.name}</p>
        })

        return (
            <div className='container-2'>
                <div  className='container'>
                <h3>{name}</h3>
                <br></br>
                {arrayOfPlayers}
                <br></br>
                <button className='submit' onClick={() => this.sendPlayers()}>Add Players</button> 
                <br></br>
                <button className="submit" onClick={this.handleDelete}>Delete Team</button>
                </div>
                <br></br>
            </div>
        )
    }

}
 
export default withRouter(FantasyTeam);
