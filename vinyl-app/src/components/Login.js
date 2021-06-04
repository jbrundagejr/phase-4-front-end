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
      // console.log(userInfo)
      // localStorage.token = userInfo.token
      localStorage.setItem('name', userInfo.name)
      localStorage.setItem('user', userInfo.user)
      localStorage.setItem('token', userInfo.token)
      // debugger
      onLogin(userInfo)
      history.push('/vinyls')
     }
     )}

  return (
    <div id="photoContainer">
      <div id="loginFormContainer">
        <p className="welcomeBodyFont">Welcome to vinylboxd! This is a place to review and share all your favorite vinyl records!</p>
        <p className="welcomeBodyFont">Login to get started.</p>
        <form onSubmit={handleClick}>
          <Input className="input" label='  Name  ' id="name" value={userName} onChange={whatUserNamed} type="text" placeholder="Your name"></Input><br/>
          <Input className="input" label='Password' id="userpassword" value={userPassword} onChange={whatUserPassworded} type="password" placeholder="Your password"></Input><br/>
          <Button>Login</Button><br/>
          <p className="welcomeBodyFont" id="loginBlurb"> Don't have an account?</p>
        </form>
        <CreateAccount id="create-account-btn" onLogin={onLogin} />
      </div>
    </div>
  )
}

export default Login