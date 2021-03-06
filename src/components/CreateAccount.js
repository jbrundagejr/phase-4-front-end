import {Form, Button, Modal, Input} from 'semantic-ui-react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function CreateAccount({onLogin}){
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    const newUser = {
      name: name,
      password: password,
      email: email,
      image_url: imgUrl
    }
    fetch("https://peaceful-hollows-67278.herokuapp.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then(resp => resp.json())
    .then(newUserObj => {
      localStorage.setItem('name', newUserObj.name)
      localStorage.setItem('user', newUserObj.user)
      localStorage.setItem('token', newUserObj.token)
      onLogin(newUserObj)
      history.push('/vinyls')
    })
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button className="modal-button" id="create-account">Create Account</Button>}
      className="modal"
      >
        <Modal.Header>Create Account</Modal.Header>
          <Form onSubmit={e => handleSubmit(e)}>
            <Form.Field>
              <Input placeholder="Name" required value={name} onChange={e => setName(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <Input placeholder="Password" required type="password"  value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <Input placeholder="Email" required type = "email"  value={email} onChange={e => setEmail(e.target.value)}/>
            </Form.Field>
            <Form.Field>
              <Input placeholder="Profile Picture" required type="url" value={imgUrl} onChange={e => setImgUrl(e.target.value)}/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Modal>
  )
}

export default CreateAccount