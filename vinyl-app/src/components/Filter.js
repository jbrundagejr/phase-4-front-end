import {Button} from 'semantic-ui-react'

function Filter({onProductionChange}){
  
  function handleProductionChange(e){
    onProductionChange(e.target.value)
  }

  function resetFilter(){
    onProductionChange("All")
  }

  return(
    <div>
      <div>
        <h3>In Production?</h3>
      </div>
      <div>
        <select name="production-filter" onChange={handleProductionChange}>
        <option value="All">All Records</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <Button onClick={resetFilter}>Reset</Button>
      </div>
    </div>
  )
}

export default Filter