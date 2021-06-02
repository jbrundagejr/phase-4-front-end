import {Modal, Image, Button, Comment} from 'semantic-ui-react'
import {useState} from 'react'

function ReviewModal({review, starRating}) {
    const [open, setOpen] = useState(false)

    return (
    <div>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<p>{review.title}</p>}>
            <Modal.Header>{review.reviewed_vinyl.band_name} - {review.reviewed_vinyl.album_title}</Modal.Header>
            <Modal.Content image>
            <Image size='medium' src={review.reviewed_vinyl.image_url} wrapped />
            <Modal.Description>
                <h2>{review.title}</h2>
                <h3>My Rating: {starRating(review.rating)}</h3>
                <p>{review.content}</p>
            </Modal.Description>
        </Modal.Content>
        </Modal>
    </div>
    )
}

export default ReviewModal