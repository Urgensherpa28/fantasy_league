import React from 'react';
import Player from '../components/Player'
import styled from 'styled-components';

class PlayerContainer extends React.Component {
    state = {
        currentFantasyTeam: [],
        fantasyTeamId: []
    }

    componentDidMount() {
        fetch(`http://localhost:3000/fantasy_teams`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": localStorage.token
            },
        })
        .then(res => res.json())
        .then(data => {
           this.setState({
               currentFantasyTeam: data,
               fantasyTeamId: data[0].id
           })
        })
    }

    unique(data, key) {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }

    filteredList = () => {
        const uniqueList = this.unique(this.props.players, it => it.name)
        return uniqueList.filter(player => player.team_id === parseInt(this.props.routerProps.match.params.id))
    }

    addPlayer = (userTeam) => {
        this.setState({
          currentFantasyTeam: userTeam
        })
      }

    handleDelete = (e) => {
        this.addPlayer(e.target.value)
    }

    fantasyTeamId = (e) => {
        // this.setState({
        //     fantasyTeamId: e.target.value
        // })
        console.log(e.target.value)
    }

    render() {
        console.log(this.state.fantasyTeamId)

        const dropDown = (
            <select name="fantasy-team-dropdown" id="fantasy-team-dropdown" onChange={(e) => this.setState({fantasyTeamId: e.target.value})}> 
                {this.state.currentFantasyTeam.map(team => {
                   return <option value={team.id}>{team.name}</option>
                })}
            </select>
        ) 

        return (
            <div className='container'>
                {dropDown}
                <br></br>
                {this.filteredList().map(player => {
                    return <Player player={player} key={player.id} id={player.id} fantasyTeamId={this.state.fantasyTeamId} currentFantasyTeam={this.state.currentFantasyTeam}/>
                })}
            </div>
        )
    }

}
 
export default PlayerContainer;