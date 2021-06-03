import VinylCard from './VinylCard'

function VinylList({vinylArr, loggedInUser}){
  const vinylArray = vinylArr.map(vinylObj =>
    <VinylCard className="vinyl-cards" key={vinylObj.id} vinyl={vinylObj} loggedInUser={loggedInUser}/>)

  return(
    <div >
      {/* <div>
        <h2>Vinyl Collection</h2>
      </div> */}
      <div class="ui link four cards" id="card-collection">
        {vinylArray.length > 0 ? vinylArray : 
          <p>Don't seem to have that one. Maybe add it to the collection?</p>}
      </div>
    </div>
  )
}

export default VinylList