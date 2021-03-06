import {Modal, Image} from 'semantic-ui-react'
import {useState} from 'react'

function ReviewModal({review, starRating}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<p id="reviewModalTitle">{review.title}</p>}>
            <Modal.Header><h3>{review.reviewed_vinyl.band_name} - {review.reviewed_vinyl.album_title}</h3></Modal.Header>
            <Modal.Content image>
            <Image size='medium' src={review.reviewed_vinyl.image_url} wrapped />
            <Modal.Description>
                <h2 id="review-modal-title" >{review.title}</h2>
                <h3>My Rating: {starRating(review.rating)}</h3>
                <p>{review.content}</p>
            </Modal.Description>
        </Modal.Content>
        </Modal>
    </div>
    )
}

export default ReviewModal