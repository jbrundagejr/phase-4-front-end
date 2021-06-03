import {useState} from 'react'
import {Input, Button} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import CreateAccount from './CreateAccount'

function Login({ toggleLogIn, onLogin }){
  const [userName, setUserName] = useState("")
  const [userPassword, setUserPassword] = useState("")
  const history = useHistory()

  function whatUserNamed(e){
    setUserName(e.target.value)
  }

  function whatUserPassworded(e){
    setUserPassword(e.target.value)
  }

  function handleClick(e){
    e.preventDefault()
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: userName, password: userPassword})
    })
     .then(res => res.json())
     .then(userInfo => {
      localStorage.token = userInfo.token
      onLogin(userInfo)
      history.push('/vinyls')
     }
     )}

  return (
    <div id="photoContainer">
      <div id="loginFormContainer">
        <p>Welcome to vinlyboxd! This is a place to review and share all your favorite vinyl records! Login to get started.</p>
        <form onSubmit={handleClick}>
        <Input className="input" label='  Name  ' id="name" value={userName} onChange={whatUserNamed} type="text" placeholder="Your name"></Input><br/>
        <Input className="input" label='Password' id="userpassword" value={userPassword} onChange={whatUserPassworded} type="password" placeholder="Your password"></Input><br/>
        <Button>Login</Button>
        <CreateAccount onLogin={onLogin} />
      </form>
      </div>
    </div>
  )
}

export default Login