import {NavLink} from "react-router-dom"
import {useHistory} from "react-router-dom"

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
          <img id="logo" src="https://i.imgur.com/BJfncxA.png" alt="logo"></img>
          <h1 onClick={handleHomeClick}>vinylboxd</h1>
        </div>
        <nav>
          <NavLink to="/vinyls">Records</NavLink>
          { loggedInUser ? <NavLink to={`/profile/${loggedInUser.user}`}>{loggedInUser.name}</NavLink> : null }
          {/* <NavLink to={`/profile/${loggedInUser.id}`}>{loggedInUser.name}</NavLink> */}
          {loggedInUser ? <NavLink to="/" onClick={handleLogout}>Logout</NavLink> : <NavLink to="/">Login</NavLink>}
        </nav>
      </div>
    </div>
  )
}

export default Header