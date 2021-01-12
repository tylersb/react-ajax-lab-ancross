import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';
import DisplayCards from './displayCards'

const App = () => {
  // Tha big standardz
  let [data, setData] = useState({hits: []})
  let [search, setSearch] = useState('')
  // Stretch goal / bonus!
  let [favs, setFavs] = useState([])

  // Swipe em!
  useEffect(() => {
    console.log('hey')
    fetch('http://acnhapi.com/v1/villagers/')
    .then(response => response.json())
    .then((rdata) => {
      rdata = Object.values(rdata)
      setData({hits: rdata})
    })
  }, [])

  // Action for updating our search value
  const handleChange = (e) => {
    setSearch(e.currentTarget.value)
  }

  // Tailor our results
  const dynamicSearch = () => {
      return data.hits.filter(villager => villager.name['name-USen'].toLowerCase().includes(search.toLowerCase()))
  }

  // Build a "favorites" box
  const handleClick = (villager) => {
    if(!favs.includes(villager)){
      setFavs([...favs, villager])
    }
  }

  // add this bit to handle edge-case handling for DisplayCards bcuz we lazyyyyyyy
  const handleDoofus = () => {
    
  }


    return (
      <div className="App">
        <div className="searchBox">
          <input type="text" value={search} onChange={handleChange} />
        </div>
        <div>
          <DisplayCards handleClick={handleClick} data={dynamicSearch()}/>
        </div>
        <div className="favBox">
          <DisplayCards handleClick={handleDoofus} data={favs} />
        </div>
      </div>
    );
}

export default App;
