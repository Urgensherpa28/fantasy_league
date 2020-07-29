import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import '../App.css';

function RegistrationForm(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()

        const userInfo = {
            username: username,
            password: password
        }

        props.handleRegister(userInfo)
    }

    return (
    <Container>
        <h1> Register </h1>
        <br></br>
    <form onSubmit={handleSubmit} className='form'>
        <br></br>
        <input name="username" value={username} onChange={(evt) => setUsername(evt.target.value)} type="text" placeholder="username" />
        <br></br>
        <br></br>
        <input name="password" value={password} onChange={(evt) => setPassword(evt.target.value)} type="password" placeholder="password" /> 
        <br></br>
        <br></br>
        <input type="submit" className='submit'/>
    </form>
    </Container>)
}
 
export default RegistrationForm