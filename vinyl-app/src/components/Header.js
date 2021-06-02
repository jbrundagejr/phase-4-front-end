import {NavLink} from "react-router-dom"
import {useHistory} from "react-router-dom"
import {Button} from 'semantic-ui-react'

function Header({loggedInUser, onLogin}){
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
      <h1 onClick={handleHomeClick}>Vinyl Collection App</h1>
      <div id='navContainer'>
        <nav>
          <NavLink to="/vinyls">Records</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/addVinyl">Add a Record</NavLink>
          {loggedInUser ? <Button onClick={handleLogout}>Logout</Button> : null}
        </nav>
      </div>
    </div>
  )
}

export default Header