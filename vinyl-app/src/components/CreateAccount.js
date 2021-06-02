import {Form, Button, Modal, TextArea} from 'semantic-ui-react'
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
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    .then(resp => resp.json())
    .then(newUserObj => {
      localStorage.token = newUserObj.token
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
                    <TextArea placeholder="Name" required value={name} onChange={e => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder="Password" required  value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <TextArea placeholder="Profile Picture" required type="url" value={imgUrl} onChange={e => setImgUrl(e.target.value)}/>
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </Modal>
  )
}

export default CreateAccount