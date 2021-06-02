import VinylCard from './VinylCard'

function VinylList({vinylArr}){
  const vinylArray = vinylArr.map(vinylObj =>
    <VinylCard key={vinylObj.id} vinyl={vinylObj} />)

  return(
    <div>
      <div>
        <h2>Vinyl Collection</h2>
      </div>
      <div class="ui link four cards">
        {vinylArray.length > 0 ? vinylArray : 
          <p>Don't seem to have that one. Maybe add it to the collection?</p>}
      </div>
    </div>
  )
}

export default VinylList