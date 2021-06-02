import {Feed} from 'semantic-ui-react'
import VinylModal from './VinylModal'
import ReviewModal from './ReviewModal'

function ReviewCard({review}){

  function starRating(rating) {
    if (rating === 1) {
        return "⭐"
    } else if (rating === 2) {
        return "⭐⭐"
    } else if (rating === 3) {
        return "⭐⭐⭐"
    } else if (rating === 4) {
        return "⭐⭐⭐⭐"
    } else {
        return "⭐⭐⭐⭐⭐"
    }
}

  return(
   
      <Feed>
        <Feed.Event>
          <Feed.Label image={<VinylModal id={review.vinyl_id} tag="review"/>} />
          <Feed.Content>
            <Feed.Summary>
              <ReviewModal review={review} starRating={starRating}/>
              <p>{starRating(review.rating)}</p>
              {/* <VinylModal id={review.vinyl_id} tag="review"/> */}
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        </Feed>
      // {/* <img src= style={{height: "150px"}}/>
      //     <h2>{review.reviewed_vinyl.album_title}</h2>
      //     <h3>{review.reviewed_vinyl.band_name}</h3>
      //     <p>{review.rating}/5</p>
      //     <p>{review.content}</p> */}
  )
}

export default ReviewCard