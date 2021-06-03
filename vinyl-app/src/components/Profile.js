import { useEffect, useState} from 'react'
import { useParams, NavLink } from "react-router-dom"
import {Card, Icon} from 'semantic-ui-react'
import ReviewCard from './ReviewCard'

function Profile(){
  const [userData, setUserData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/users/${params.id}`)
        .then(resp => resp.json())
        .then(function(serverUserInfo) {
            setUserData(serverUserInfo)
            setIsLoaded(true)
        })
  }, [params.id])

  function averageRating(reviewArr) {
    let ratingsArr = reviewArr.map(review => review.rating)
    return ratingsArr.reduce((a, b) => a + b) / ratingsArr.length
  }

  if (isLoaded) {

    const userReviewsList = userData.reviews.map(review => {
      return <ReviewCard key={review.id} review={review} />
    })

    return (
      <div className="profile-page">
        <div className="info-panel">
          <h1>{userData.name}</h1>
          <img src={userData.image_url} alt={userData.name} style={{height: "300px"}}/><br/>
          <a href={`mailto: ${userData.email}`}> <Icon name="mail"></Icon></a>
          <p>Total Reviews: {userData.reviews.length}</p>
          <p>Average Vinyl Rating: {userData.reviews.length === 0 ? "N/A" : averageRating(userData.reviews)}</p>
        </div>
        <div className="user-reviews-list">
        <Card>
          <Card.Content>
          <Card.Header>My Reviews</Card.Header>
          </Card.Content>
          <Card.Content>
          {userReviewsList}
          </Card.Content>
        </Card>
        <NavLink to="/addVinyl">Add a Record</NavLink>
        </div>
      </div>
    )
  } else {
    return (
      <p>Loading</p>
    )
  }
}

export default Profile