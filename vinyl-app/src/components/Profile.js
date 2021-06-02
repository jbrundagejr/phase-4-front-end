import { useEffect, useState} from 'react'
import { useParams } from "react-router-dom"

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
      // Replace with component?
      return(
        <div className="temp-review-card" key={review.id}>
          <img src={review.reviewed_vinyl.image_url} alt={review.reviewed_vinyl.album_title} style={{height: "150px"}}/>
          <h2>{review.reviewed_vinyl.album_title}</h2>
          <h3>{review.reviewed_vinyl.band_name}</h3>
          <p>{review.rating}/5</p>
          <p>{review.content}</p>
        </div>
      )
    })

    return (
      <div className="profile-page">
        <div className="info-panel">
          <h1>{userData.name}</h1>
          <img src={userData.image_url} alt={userData.name} style={{height: "300px"}}/>
          <p>Total Reviews: {userData.reviews.length}</p>
          <p>Average Vinyl Rating: {userData.reviews.length === 0 ? "N/A" : averageRating(userData.reviews)}</p>
        </div>
        <div className="user-reviews-list">
          {userReviewsList}
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