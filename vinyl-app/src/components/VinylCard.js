import{useState} from 'react'
import {Card, Image} from 'semantic-ui-react'
import VinylModal from './VinylModal'

function VinylCard({vinyl, loggedInUser}){
  const {id, band_name, album_title, image_url, year_released} = vinyl
  const [showModal, setShowModal] = useState(false)

  function handlePopUp(){
    setShowModal(!showModal)
  }

  return (
    <div className="card-div">
      <Card>
        <Image onClick={handlePopUp} src={image_url} alt={band_name} wrapped ui={false} />
        <Card.Content>
          <Card.Header> <h3 className="card-content">{album_title}</h3></Card.Header>
          <Card.Meta>
            <h4 className="card-content">{band_name}</h4>
            <p className="card-content">{year_released}</p>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <VinylModal id={id} tag="vinyl-card" loggedInUser={loggedInUser}/>
        </Card.Content>
      </Card>
    </div>
  )
}

export default VinylCard