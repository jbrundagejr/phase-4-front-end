import {useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {useHistory} from "react-router-dom"
import {Button} from 'semantic-ui-react'

function Header({setLoggedInUser, loggedInUser, onLogin}){
  const history = useHistory()
  
  function handleHomeClick(){
    history.push("/")
  }

  function handleLogout(){
    localStorage.clear()
    onLogin(null)
  }

  return (
    <div>
      
      <div id='navContainer'>
        <div id="logoHeaderContainer">
          <img id="logo" src="https://i.imgur.com/BJfncxA.png"></img>
          <h1 onClick={handleHomeClick}>vinylboxd</h1>
        </div>
        <nav>
          <NavLink to="/vinyls">Records</NavLink>
          { loggedInUser ? <NavLink to={`/profile/${loggedInUser.user}`}>{loggedInUser.name}</NavLink> : null }
          {/* <NavLink to={`/profile/${loggedInUser.id}`}>{loggedInUser.name}</NavLink> */}
          <NavLink to="/addVinyl">Add a Record</NavLink>
          {loggedInUser ? <Button onClick={handleLogout}>Logout</Button> : null}
        </nav>
      </div>
    </div>
  )
}

export default Header