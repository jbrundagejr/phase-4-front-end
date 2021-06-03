import {Card} from 'semantic-ui-react'
import VinylModal from './VinylModal'

function VinylCard({vinyl, loggedInUser}){
  const {id, band_name, album_title, year_released} = vinyl

  return (
    <div className="card-div">
      <Card>

        <VinylModal id={id} tag="vinyl-card" loggedInUser={loggedInUser}/>
        <Card.Content>
          <Card.Header> <h3 className="card-content">{album_title}</h3></Card.Header>
          <Card.Meta>
            <h4 className="card-content">{band_name}</h4>
            <p className="card-content">{year_released}</p>
          </Card.Meta>
        </Card.Content>
      </Card>
    </div>
  )
}

export default VinylCard