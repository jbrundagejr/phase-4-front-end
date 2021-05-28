import {NavLink} from "react-router-dom"
import {useHistory} from "react-router-dom"

function Header(){
  const history = useHistory()

  function handleHomeClick(){
    history.push("/")
  }

  return (
    <div>
      <h1 onClick={handleHomeClick}>Vinyl Collection App</h1>
      <div id='navContainer'>
        <nav>
          <NavLink to="/vinyls">Records</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/addVinyl">Add a Record</NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Header