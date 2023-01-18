import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCards from './components/DisplayCards'

function App() {
  const [data, setData] = useState({ villagers: [] })
  const [faves, setFaves] = useState([])
  const [search, setSearch] = useState('')

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://acnhapi.com/v1/villagers/')
      console.log(response.data)
      const responseData = Object.values(response.data)
      setData({ villagers: responseData })
    }
    fetchData()
  }, [])

  const getFilteredVillagers = (e) => {
    let searchTerm = search.toLowerCase()
    return data.villagers.filter((v) => {
      let lowerCaseName = v.name['name-USen'].toLowerCase()
      return lowerCaseName.includes(searchTerm)
    })
  }

  const handleClick = (villager) => {
    if (!faves.includes(villager)) {
      setFaves([...faves, villager])
    }
  }

  return (
    <div className="App">
      <div>
        <label htmlFor="villager-search">Search for a villager:</label>
        <input
          id="villager-search"
          type="text"
          value={search}
          onChange={handleChange}
        />
      </div>
      <DisplayCards
        clickie={true}
        villagers={getFilteredVillagers()}
        handleClick={handleClick}
      />
      <div>
        <h1>Favorite Villagers:</h1>
        <DisplayCards 
        clickie={false}
        villagers={faves} />
      </div>
    </div>
  )
}

export default App
