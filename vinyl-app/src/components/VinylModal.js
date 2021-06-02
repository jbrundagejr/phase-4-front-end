import {useState, useEffect} from 'react'
import {Modal, Image, Input, Rating, Form, Button, Comment} from 'semantic-ui-react'

function VinylModal({id}){
  const [vinyl, setVinyl] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [userTitle, setUserTitle] = useState("")
  const [userContent, setUserContent] = useState("")
  const [userRating, setUserRating] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3000/vinyls/${id}`)
      .then(res => res.json())
      .then(vinylData => {
        setVinyl(vinylData)
        setIsLoaded(true)
      })
  }, [id])

  if (!isLoaded) return <p>Loading...</p>

  const {band_name, album_title, image_url, year_released, in_production, reviews} = vinyl

  const reviewArray = reviews.map(reviewObj => 
    <Comment key={reviewObj.id}>
      <Comment.Content>
        <Comment.Author>{reviewObj.title}</Comment.Author>
        <Comment.Author>By: {reviewObj.user.name}</Comment.Author>
        <Comment.Text>{reviewObj.content}</Comment.Text>
        <Comment.Text>Rating: {reviewObj.rating}</Comment.Text>
      </Comment.Content>
    </Comment>
  )

  function rateAlbum(rating){
    setUserRating(rating)
  }

  function handleReviewSubmit(e){
    e.preventDefault()
    const reviewData = {
      // user_id: user.id
      vinyl_id: vinyl.id,
      title: userTitle,
      content: userContent,
      rating: parseInt(userRating)
    }
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(updatedVinyl => {
        setVinyl(updatedVinyl)
        setUserTitle("")
        setUserContent("")
      })
  }

  return (
    <div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Details</Button>}>
        <Modal.Header>{album_title}</Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={image_url} wrapped />
          <Modal.Description>
            <h3>{band_name}</h3>
            <p>Year Released: {year_released}</p>
            <p>Still in Production? {in_production}</p>
            <p>Average User Rating: </p>
          <Comment.Group>
            <h3>Reviews</h3>
            {reviewArray}
            <h4 className="rate-title">Rate this album</h4>
            <Form onSubmit={handleReviewSubmit} reply>
              <Input value={userTitle} placeholder="Your Title" onChange={e => setUserTitle(e.target.value)}/>
              <Input value={userContent} placeholder="Your Review" onChange={e => setUserContent(e.target.value)}/>
              <Rating onRate={rateAlbum} value={userRating} maxRating={5} clearable/>
              <Button content='Add Review' labelPosition='left' icon='edit' primary />
            </Form>
          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default VinylModal