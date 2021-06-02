import {useState} from 'react'
import {Input, Button} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'

function Login({ toggleLogIn }){
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
      body: JSON.stringify({name: whatUserNamed, password: whatUserPassworded})
    })
     .then(res => res.json())
     .then(userInfo =>
      localStorage.token = userInfo.token)
      history.push('/vinyls')
  }

  function handleLogout(){
    localStorage.clear()
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <Input className="input" label='Name' id="name" value={userName} onChange={whatUserNamed} type="text" placeholder="Your name"></Input>
        <Input className="input" label='Password' id="userpassword" value={userPassword} onChange={whatUserPassworded} type="password" placeholder="Your password"></Input>
        <Button>Login</Button>
      </form>
      <p onClick={toggleLogIn}>Don't have an account? Sign up.</p>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Login