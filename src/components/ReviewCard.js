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
              <p id="reviewCardStars">{starRating(review.rating)}</p>
            </Feed.Summary>
          </Feed.Content>
        </Feed.Event>
        </Feed>
  )
}

export default ReviewCard