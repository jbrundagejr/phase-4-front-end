import{useState} from 'react'
import {Card, Image} from 'semantic-ui-react'
import VinylModal from './VinylModal'

function VinylCard({vinyl}){
  const {id, band_name, album_title, image_url, year_released} = vinyl
  const [showModal, setShowModal] = useState(false)

  function handlePopUp(){
    setShowModal(!showModal)
  }

  return (
    <div>
      <Card>
        <Image onClick={handlePopUp} src={image_url} alt={band_name} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{album_title}</Card.Header>
          <Card.Meta>
            <h4>{band_name}</h4>
            <p>{year_released}</p>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <VinylModal id={id} tag="vinyl-card"/>
        </Card.Content>
      </Card>
    </div>
  )
}

export default VinylCard