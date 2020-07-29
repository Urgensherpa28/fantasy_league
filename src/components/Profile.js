import React, { Component } from 'react';
import FantasyTeam from './FantasyTeam'

class Profile extends Component {
    state = {
        fantasyArray: []
    }

    handleTeamNameChange = e => {
        this.setState({
            fantasyTeam: e.target.value
        })
    }
    
    componentDidMount() {
        fetch(`http://localhost:3000/fantasy_teams`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.token
            }
        })
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                fantasyArray: data
            })
        })
    }

    handleSubmit = e => {
        e.persist()
        e.preventDefault()
        console.log('profile js line 34')

        this.handleTeamForm()
    }

    handleTeamForm = () => {
        fetch("http://localhost:3000/fantasy_teams", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.token
            },
            body: JSON.stringify({name: this.state.fantasyTeam})
        })
        .then(r => r.json())
        .then(data => { 
            this.setState({
                fantasyArray: [data]
            })
        })
    }

    getTeams = (e) => {
        fetch("http://localhost:3000/fantasy_teams", {
            headers: {
                'Authorization': localStorage.token
            }
        })
        .then(res => res.json())
        .then(data => 
            this.setState({
                fantasyArray: data
            })
        )
    }

    addPlayerToUserTeam = e => {
        console.log(e)
    }

    render() {
        // console.log(this.state.fantasyArray)
        let teamNames = this.state.fantasyArray.map(team => {
            return <FantasyTeam team={team} key={team.id} getTeams={this.getTeams} />
        }) 
    
        return (
          <div className='container'>
            <div className='container'> 
            <form onSubmit={(e) => this.handleSubmit(e)} className='form'>
                <br></br>
                <h1><em>Build your Dream Team!</em></h1>
                <br></br>
                <input type="text" onChange={this.handleTeamNameChange} value={this.state.fantasyTeam}/>
                <br></br>
                <br></br>
                <input type="submit" className='submit'/>
            </form>
                <br></br>
            <div className='team'> 
                {teamNames}
                <br></br>
            </div>
            </div>
          </div>
        )
    }

}
 
export default Profile;