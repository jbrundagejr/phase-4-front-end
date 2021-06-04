import { useState, useEffect } from 'react'
import { Switch, Route, useHistory } from "react-router-dom"
import Header from './Header'
import Login from './Login'
import VinylPage from './VinylPage'
import Profile from './Profile'
import AddVinylForm from './AddVinylForm'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const history = useHistory()

  function onLogin(userInfo){
    setLoggedInUser(userInfo)
    history.push('/')
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user")
    if (loggedInUser) {
      // const foundUser = JSON.parse(loggedInUser)
      const user = {name: localStorage.getItem("name"),
                    user: localStorage.getItem("user"),
                    token: localStorage.getItem("token")}
      setLoggedInUser(user)
    }
  }, [])
  // console.log(loggedInUser)
  return (
    <div >
     <Header onLogin={onLogin} setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}/>
     <Switch>
      <Route exact path="/">
        <Login onLogin={onLogin} loggedInUser={loggedInUser}/>
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
