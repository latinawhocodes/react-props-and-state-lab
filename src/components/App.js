import React from 'react'
import Filters from './Filters'
import PetBrowser from './PetBrowser'

export default class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  savePets = (pets) => {
    this.setState({
      ...this.state, 
      pets: pets
    })
  }

  onFindPetsClick = () => {
    let apiURL = '/api/pets'
    if (this.state.filters.type !== "all") {
      apiURL += `?type=${this.state.filters.type}`
    }
    fetch(apiURL)
      .then (response => response.json())
      .then (pets => this.setState({
      pets: pets
    }))
  }

  onAdoptPet = petId => {
    const petMap = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true} : Pet
    })

    this.setState({pets: petMap})
  }

  onChangeType = (selectedType) => {
    this.setState({
      filters: {
        type: selectedType.target.value
      }
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={this.onFindPetsClick} onChangeType={this.onChangeType} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
