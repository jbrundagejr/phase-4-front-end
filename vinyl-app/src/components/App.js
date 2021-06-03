import { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from "react-router-dom"
import Header from './Header'
import Login from './Login'
import CreateAccount from './CreateAccount'
import VinylPage from './VinylPage'
import Profile from './Profile'
import AddVinylForm from './AddVinylForm'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const history = useHistory()

  useEffect(() => {
    if (localStorage.token) {
      fetch("http://localhost:3000/users/keep_logged_in", {
        method: "GET",
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(resp => resp.json())
      .then(resp => helpHandleResponse(resp))
    }
  }, [])

  function helpHandleResponse(resp) {
    if (resp.error) {
      console.error(resp.error)
    } else {
      localStorage.token = resp.token
      setLoggedInUser(resp.user)
    }
  }

  function onLogin(userInfo, token){
    setLoggedInUser([userInfo, token])
    history.push('/')
  }

  return (
    <div >
     <Header onLogin={onLogin} loggedInUser={loggedInUser}/>
     <Switch>
      <Route exact path="/">
        <Login onLogin={onLogin} loggedInUser={loggedInUser}/>
        <CreateAccount onLogin={onLogin}/>
      </Route>
      <Route exact path="/vinyls">
        <VinylPage loggedInUser={loggedInUser}/>
      </Route>
      <Route exact path = "/profile/:id">
        <Profile loggedInUser={loggedInUser}/>
      </Route>
      <Route exact path = "/addVinyl">
        <AddVinylForm />
      </Route>
     </Switch>
    </div>
  )
}

export default App;
