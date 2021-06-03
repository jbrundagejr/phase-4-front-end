import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Input, Button} from 'semantic-ui-react'

function AddVinylForm(){
  const [bandName, setBandName] = useState("")
  const [albumTitle, setAlbumTitle] = useState("")
  const [imageURL, setImageURL] = useState("")
  const [yearReleased, setYearReleased] = useState("")
  const [inProduction, setInProduction] = useState("")
  const history = useHistory()

  function whatUserNamedBand(e){
    setBandName(e.target.value)
  }

  function whatUserTitledAlbum(e){
    setAlbumTitle(e.target.value)
  }

  function whatUserImaged(e){
    setImageURL(e.target.value)
  }

  function whatUserYearReleased(e){
    setYearReleased(e.target.value)
  }

  function whatUserInProduction(e){
    setInProduction(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    const newVinylData = {
      band_name: bandName,
      album_title: albumTitle,
      image_url: imageURL,
      year_released: yearReleased,
      in_production: inProduction
    }
    fetch('http://localhost:3000/vinyls', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newVinylData)
    })
      .then(res => res.json())
      .then(newVinylData => {
        history.push("/vinyls")
      })
  }

  return (
    <div>
      <div id="vinylFormHeader">
      <h2>Add Vinyl Form </h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="bandname" className="label">Band Name</label>
        <Input className="input" value={bandName} onChange={whatUserNamedBand} type="text" placeholder="Band Name"></Input>
        <label htmlFor="albumtitle" className="label">Album Title</label>
        <Input className="input"  value={albumTitle} onChange={whatUserTitledAlbum} type="text" placeholder="Album Title"></Input>
        <label htmlFor="imageURL" className="label">Album Cover URL</label>
        <Input className="input" value={imageURL} onChange={whatUserImaged} type="url" placeholder="Album Cover URL"></Input>
        <label htmlFor="yearreleased" className="label">Year Released</label>
        <Input className="input" value={yearReleased} onChange={whatUserYearReleased} type="text" placeholder="Year Released"></Input>
        <label htmlFor="inProduction" className="label">In Production?</label>
        <select value={inProduction} onChange={whatUserInProduction} id="inProduction" name="In-production">
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <Button>Submit New Vinyl</Button>
      </form>
    </div>
  )
}

export default AddVinylForm