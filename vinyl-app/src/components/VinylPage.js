import {useState, useEffect} from 'react'
import VinylList from './VinylList'
import Search from './Search'

function VinylPage({loggedInUser}){
  const [vinylArr, setVinylArr] = useState([])
  const [searchedVinyl, setSearchedVinyl] = useState("")

  useEffect(() => {
    fetch('http://localhost:3000/vinyls')
      .then(res => res.json())
      .then(vinylData => setVinylArr(vinylData))
  }, [])

  function handleSearch(e){
    setSearchedVinyl(e)
  }

  const searchedVinylArr = vinylArr.filter((vinyl) => {
    if (vinyl.band_name.toLowerCase().includes(searchedVinyl.toLowerCase())){
      return true
    } else {return (vinyl.album_title.toLowerCase().includes(searchedVinyl.toLowerCase()))}
  })


  return (
    <div>
      <div className="page" >
        <div id="vinyl-page">
          <h2>Vinyl Collection</h2>
          <Search searchedVinyl={searchedVinyl} onSearch={handleSearch} />
        </div>
        <VinylList vinylArr={searchedVinylArr} loggedInUser={loggedInUser}/>
      </div>
    </div>
  )
}

export default VinylPage