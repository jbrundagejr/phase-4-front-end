import {useState, useEffect} from 'react'
import VinylList from './VinylList'
import Search from './Search'
import Filter from './Filter'

function VinylPage(){
  const [vinylArr, setVinylArr] = useState([])
  const [searchedVinyl, setSearchedVinyl] = useState("")
  const [selectedProduction, setSelectedProduction] = useState("All")

  useEffect(() => {
    fetch('http://localhost:3000/vinyls')
      .then(res => res.json())
      .then(vinylData => setVinylArr(vinylData))
  }, [])

  function onProductionChange(selectedProduction){
    setSelectedProduction(selectedProduction)
  }

  const vinylByProduction = vinylArr.filter((vinyl) => {
    if (selectedProduction === "All") {
      return true
    } else { return selectedProduction === vinyl.in_production}
  })

  function handleSearch(e){
    setSearchedVinyl(e)
  }

  const searchedVinylArr = vinylByProduction.filter((vinyl) => {
    if (vinyl.band_name.toLowerCase().includes(searchedVinyl.toLowerCase())){
      return true
    } else {return (vinyl.album_title.toLowerCase().includes(searchedVinyl.toLowerCase()))}
  })


  return (
    <div>
      <div>
        <Search searchedVinyl={searchedVinyl} onSearch={handleSearch} />
        <Filter onProductionChange={onProductionChange} />
      </div>
      <VinylList vinylArr={searchedVinylArr}/>
    </div>
  )
}

export default VinylPage