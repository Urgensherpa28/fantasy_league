import React from 'react';

class Player extends React.Component {

    addPlayer = () => {
        console.log(this.props)
        fetch("http://localhost:3000/fantasy_players", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({player_id: this.props.id, fantasy_team_id: this.props.fantasyTeamId}) //this.props.fantasy_team 
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    render() {
        // console.log(this.props)
        return ( 
            <div>
                <h4><b>Name: </b>{this.props.player.name}</h4>
                <p><b>Age: </b>{this.props.player.age}</p>
                <p><b>Position: </b>{this.props.player.position}</p>
                <p><b>Goals Scored: </b>{this.props.player.goals}</p>
                <button onClick={this.addPlayer} className='submit'>Add Player</button>
                <br></br>
                <br></br>
            </div>
        )       
    }
    
}
 
export default Player;