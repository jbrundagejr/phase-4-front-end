import {useState, useEffect} from 'react'
import {NavLink} from "react-router-dom"
import {Modal, Image, Input, Rating, Form, Button, Comment, Icon, Card, TextArea} from 'semantic-ui-react'

function VinylModal({id, tag, loggedInUser}){
  const [vinyl, setVinyl] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [userTitle, setUserTitle] = useState("")
  const [userContent, setUserContent] = useState("")
  const [userRating, setUserRating] = useState("")
  const [open, setOpen] = useState(false)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch(`http://localhost:3000/vinyls/${id}`)
      .then(res => res.json())
      .then(vinylData => {
        setVinyl(vinylData)
        setReviews(vinylData.reviews)
        setIsLoaded(true)
      })
  }, [id])

  if (!isLoaded) return <p>Loading...</p>

  const {band_name, album_title, image_url, year_released, in_production} = vinyl
  
  function handleDelete(id){
    fetch(`http://localhost:3000/reviews/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
      }
    })
      .then(res => res.json())
      .then((deletedReview) => {
        const updatedReviewArray = reviews.filter(review =>
          review.id !== deletedReview.id
        )
        setReviews(updatedReviewArray)
      })
  }

  const reviewArray = reviews.map(reviewObj => 
    <Comment key={reviewObj.id}>
      <Comment.Content>
        <Comment.Author><h4>{reviewObj.title}</h4></Comment.Author>
        {/* <Comment.Author>By: {reviewObj.user.name}</Comment.Author> */}
        <Comment.Author><p id="commentAuthor">By: <NavLink to={`/profile/${reviewObj.user.id}`}>{reviewObj.user.name}</NavLink></p></Comment.Author>
        <Comment.Text><p>{reviewObj.content}</p></Comment.Text>
        <Comment.Text><p>Rating: {reviewObj.rating}</p></Comment.Text>
        {loggedInAndMatchStatus(reviewObj) ? <Icon name="trash alternate" onClick={() => handleDelete(reviewObj.id)}></Icon> : null}
        {/* {loggedInUser.user === reviewObj.user_id ? <Icon name="trash alternate" onClick={() => handleDelete(reviewObj.id)}></Icon> : null} */}
      </Comment.Content>
    </Comment>
  )

  function rateAlbum(e, {rating, maxRating}){
    setUserRating({rating, maxRating})
  }

  function loggedInAndMatchStatus(reviewObj) {
      if (loggedInUser) {
        if (loggedInUser.user == reviewObj.user_id) {
          return true
        } else {
          // console.log("trigger")
          return false
        }
      } else {
        return false
      }
    }

  function handleReviewSubmit(e){
    e.preventDefault()
    const reviewData = {
      vinyl_id: id,
      title: userTitle,
      content: userContent,
      rating: userRating.rating
    }

    // console.log(reviewData.rating)
    fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.token}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify(reviewData)
    })
      .then(res => res.json())
      .then(newReview => {
        setReviews([...reviews, newReview])
        setUserTitle("")
        setUserContent("")

      })
  }

  function checkTag(tag) {
    if (tag === "review") {
      return <Image size="small" src={image_url} alt={album_title}/>
    } else if (tag === "vinyl-card") {
      return <Card><Image src={image_url} alt={band_name} wrapped ui={false} /></Card>
    } else if (tag === "collection") {
      return <Image className="collection-card" size="medium" src={image_url} alt={album_title}/>
    }
  }

  function averageRating(reviewArr) {
    if (reviewArr.length !== 0) {
      const ratings = reviewArr.map((review) => {
        return review.rating
      })
      return ratings.reduce((a, b) => a + b) / ratings.length
    } else {
      return 0
    }
  }

  function starRatingDecimal(rating) {
    if (rating === 0) {
      return "N/A"
  } else if (rating === 1) {
      return "⭐"
  } else if (rating > 1 && rating <= 2) {
      return "⭐⭐"
  } else if (rating > 2 && rating <= 3) {
      return "⭐⭐⭐"
  } else if (rating > 3 && rating <= 4) {
      return "⭐⭐⭐⭐"
  } else {
      return "⭐⭐⭐⭐⭐"
  }
  }

  function isUserLoggedIn(){
    if (loggedInUser && tag !== "collection") {
      return (
          <div>
            <h3 className="rate-title">Review this album</h3>
            <Form onSubmit={handleReviewSubmit} reply>
            <Input value={userTitle} placeholder="Your Title" id="review-title-input"onChange={e => setUserTitle(e.target.value)}/>
            <TextArea value={userContent} placeholder="Your Review" onChange={e => setUserContent(e.target.value)}/>
            <Rating onRate={rateAlbum} value={userRating} maxRating={5} clearable/>
            <br/>
            <Button content='Add Review' labelPosition='left' icon='edit' primary />
            </Form>
          </div>)
    }
  }

  return (
    <div className="vinyl-modal">
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={checkTag(tag)}>
        <Modal.Header><h3>{album_title}</h3></Modal.Header>
        <Modal.Content image>
          <Image size='medium' src={image_url} wrapped />
          <Modal.Description>
            <h3>{band_name}</h3>
            <p><span>Year Released:</span> {year_released}</p>
            <p><span>Still in Production?</span> {in_production ? "Yes" : "No"}</p>
            <p><span>Average User Rating:</span> {starRatingDecimal(averageRating(reviews))} </p>
          <Comment.Group>
            <h3>Reviews</h3>
            {reviewArray}
            {loggedInUser ? isUserLoggedIn() : null }
          </Comment.Group>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    </div>
  )
}

export default VinylModal