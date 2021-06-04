import { useEffect, useState} from 'react'
import { useParams, NavLink } from "react-router-dom"
import {Card, Icon} from 'semantic-ui-react'
import ReviewCard from './ReviewCard'
import VinylModal from './VinylModal'

function Profile({loggedInUser}){
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
    let avg = ratingsArr.reduce((a, b) => a + b) / ratingsArr.length
    return avg.toFixed(2)
  }

  if (isLoaded) {

    const userReviewsList = userData.reviews.map(review => {
      return <ReviewCard key={review.id} review={review} />
    })

    const collectionList = userData.reviews.map(review => {
      return <VinylModal loggedInUser={loggedInUser}
                         key={review.id}
                         tag="collection"
                         id={review.vinyl_id}
                        />
    })

    return (
      <>
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
            <Card.Header><h3 id="my-reviews">My Reviews</h3></Card.Header>
            </Card.Content>
            <Card.Content>
            {userReviewsList.length === 0 ? <p id="no-reviews">No reviews yet.</p> : null}
            {userReviewsList}
            </Card.Content>
          </Card>
          {loggedInUser ? <NavLink to="/addVinyl">Add a Record</NavLink> : null }
          </div>
        </div>
        <h2 id="my-collection-h2">My Collection</h2>
        <div className="profile-collection">
          {collectionList.length === 0 ? <p id="no-collection">Review a vinyl to add it to your collection.</p> : null}
          {collectionList}
        </div>
      </>
    )
  } else {
    return (
      <p>Loading</p>
    )
  }
}

export default Profile