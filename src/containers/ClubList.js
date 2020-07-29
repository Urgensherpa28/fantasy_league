import React from 'react';
import Club from '../components/Club'

const ClubList = (props) => {

    function selectLeague(e) {
        props.changeLeague(e.target.value)
    }

    return (
        // console.log(this.props.teams)
        <div className='container'>
        <br></br>
        <h1>Club List</h1>
        <br></br>
        <label>Sort By League:  </label>
        <select name="leagues" id="leagues" onChange={selectLeague}>
            <option value="All">All</option>
            <option value="Spain">La Liga</option>
            <option value="England">EPL</option>
            <option value="Italy">Serie A</option>
            <option value="Germany">Bundesliga</option>
            <option value="France">Ligue 1</option>
        </select>
        <br></br>
            <div>
                {props.teams.map(team => {
                        return <Club team={team} key={team.id}/>
                })}
            </div>
        </div>
        )
}
 
export default ClubList;