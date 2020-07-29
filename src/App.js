import React, {Component} from 'react'
import './App.css'
// import { Container } from 'semantic-ui-react'
import { Route, withRouter, Switch } from 'react-router-dom'

import ClubList from './containers/ClubList'
import LeagueContainer from './containers/LeagueContainer'
import PlayerContainer from './containers/PlayerContainer'
import NavBar from './containers/NavBar'

import Profile from './components/Profile'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

class App extends Component {
  state = {
    teams: [],
    leagues: [],
    players: [],
    filteredTeams: 'All',
    user: {
      id: 0,
      username: '',
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/teams`)
      .then(resp => resp.json())
      .then(data => 
        this.setState({
        teams: data
    }))
    
    fetch(`http://localhost:3000/leagues`)
      .then(resp => resp.json())
      .then(data => this.setState({
        leagues: data
    }))
  
    fetch(`http://localhost:3000/players`)
    .then(resp => resp.json())
    .then(data => this.setState({
      players: data
    }))
    
    if (localStorage.token) {
      fetch(`http://localhost:3000/users/stay_logged_in`, {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(resp => resp.json())
      .then(this.handleResponse)
    }
  }

  handleLogin = (userInfo) => {
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
    .then(r => r.json())
    .then(this.handleLoginResponse)
  }

  handleLogout = () => {
    localStorage.token = ""
    this.props.history.push("/")

    if (this.props.history.location.pathname === "/") {window.location.reload(true)}
  }

  handleResponse = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token

      this.setState({
        user: {
          id: resp.user.id,
          username: resp.user.username
        }
      }
      )
    }
    else {
      alert(resp.error)
    }
  }

  handleLoginResponse = (resp) => {
    if (resp.user) {
      localStorage.token = resp.token

      this.setState({
        user: {
          id: resp.user.id,
          username: resp.user.username
        }
      }, () => this.props.history.push("/profile")
      )
    }
    else {
      alert(resp.error)
    }
  }

  handlePatchUser = (user) => {    
    this.setState({
      user: user
    })
  }

  handleRegister = (userInfo) => {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(r => r.json())
      .then(this.handleLoginResponse)
  }

  renderProfile = () => {
    return localStorage.token ?
      <Profile user={this.state.user}
        handleLogout={this.handleLogout}
        handlePatchUser={this.handlePatchUser}/>
      : this.props.history.push("/login")
  }

  filterClubs = () => {
    let theArrayToDisplay = this.state.teams 
    if (this.state.filteredTeams === 'Spain') {
      theArrayToDisplay = this.state.teams.filter(team => {
        return team.league_id === 6
      })
    }
    if (this.state.filteredTeams === 'England') {
      theArrayToDisplay = this.state.teams.filter(team => {
        return team.league_id === 7
      })
    }
    if (this.state.filteredTeams === 'Italy') {
      theArrayToDisplay = this.state.teams.filter(team => {
        return team.league_id === 8
      })
    }
    if (this.state.filteredTeams === 'Germany') {
      theArrayToDisplay = this.state.teams.filter(team => {
        return team.league_id === 9
      })
    }
    if (this.state.filteredTeams === 'France') {
      theArrayToDisplay = this.state.teams.filter(team => {
        return team.league_id === 10
      })
    }
    return theArrayToDisplay
  }
 
  changeLeague = (club) => {
    this.setState({
      filteredTeams: club
    })
  }

  renderLeagues = () => {
    return <LeagueContainer leagues={this.state.leagues} 
    />
  }

  renderClubs = (club) => {
    return <ClubList teams={this.filterClubs(club)} changeLeague={this.changeLeague} />
  }

  renderPlayers = (routerProps) => {
    return <PlayerContainer players={this.state.players} routerProps={routerProps} />
  }

  renderLoginForm = () => {
    return <LoginForm handleLogin={this.handleLogin}/>
  }

  renderRegistrationForm = () => {
    return <RegistrationForm handleRegister={this.handleRegister}/>
  }
  
  render() { 
    // console.log(this.state.players)
    return ( 
      <div>
        <div>
        <NavBar/>
        <Switch>
          <Route path="/login" render={this.renderLoginForm} />
          <Route path="/register" render={this.renderRegistrationForm} /> 
          <Route path="/profile" render={this.renderProfile} />
          <Route path="/logout" render={this.handleLogout} />
          <Route path="/teams/:id" render={this.renderPlayers} />
          <Route path="/teams" render={this.renderClubs} />
          <Route path="/leagues" render={this.renderLeagues} />
        </Switch>
        </div>
      </div>
     )
  }
}
 
const MagicalComponent = withRouter(App)
export default MagicalComponent;