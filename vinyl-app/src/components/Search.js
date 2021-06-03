import {Input} from 'semantic-ui-react'

function Search({searchedVinyl, onSearch}){
  return(
    <div>
      <div>
        <Input 
          type="text" 
          id="search" 
          placeholder="Search by band or album name..."
          value={searchedVinyl}
          onChange={e => onSearch(e.target.value)}>
        </Input>
      </div>
    </div>
  )
}

export default Search