import {Feed} from 'semantic-ui-react'

function ReviewCard({review}){
  return(
   
      <Feed>
        <Feed.Event>
          <Feed.Label image={review.reviewed_vinyl.image_url} alt={review.reviewed_vinyl.album_title} />
          <Feed.Content>
            <Feed.Summary>
              <p>{review.title}</p>
              <p>{review.rating}</p>
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