import {NavLink} from "react-router-dom"
import {useHistory} from "react-router-dom"

function Header({loggedInUser, onLogin}){
  const history = useHistory()
  
  function handleHomeClick(){
    if (loggedInUser) {
      history.push("/vinyls")
    } else {
    history.push("/")
    }
  }

  function handleLogout(){
    localStorage.clear()
    onLogin(null)
  }

  return (
    <div>
      
      <div id='navContainer'>
        <div id="logoHeaderContainer">
          <img id="logo" src="https://i.imgur.com/BJfncxA.png" alt="logo" />
          <h1 onClick={handleHomeClick} id="vinylboxd">vinylboxd</h1>
        </div>
        <nav>
          <NavLink to="/vinyls">Records</NavLink>
          { loggedInUser ? <NavLink to={`/profile/${loggedInUser.user}`}>{loggedInUser.name}</NavLink> : null }
          {loggedInUser ? <NavLink to="/" onClick={handleLogout}>Logout</NavLink> : <NavLink to="/">Login</NavLink>}
        </nav>
      </div>
    </div>
  )
}

export default Header