import {useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {useHistory} from "react-router-dom"
import {Button} from 'semantic-ui-react'

function Header({setLoggedInUser, loggedInUser, onLogin}){
  const history = useHistory()
  
  // useEffect(() => {
  //   if(localStorage.token){
  //     fetch(`http://localhost:3000/keep_logged_in`,{
  //       method: "POST",
  //       headers: {
  //         "Authorization": `Bearer ${localStorage.token}`,
  //         "content-type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         token: localStorage.token
  //       })
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res)
  //       setLoggedInUser(res)})
  //   }
  // }, [setLoggedInUser])

  // console.log(loggedInUser)

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