import React from 'react'
import { Switch, Route } from "react-router-dom"
import Header from './Header'
import Login from './Login'
import CreateAccount from './CreateAccount'
import VinylPage from './VinylPage'
import Profile from './Profile'
import AddVinylForm from './AddVinylForm'

function App() {
  

  return (
    <div >
     <Header />
     <Switch>
      <Route exact path="/">
        <Login />
        <CreateAccount />
      </Route>
      <Route exact path="/vinyls">
        <VinylPage />
      </Route>
      <Route exact path = "/profile/:id">
        <Profile />
      </Route>
      <Route exact path = "/addVinyl">
        <AddVinylForm />
      </Route>
     </Switch>
    </div>
  )
}

export default App;
