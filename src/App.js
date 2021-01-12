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

    return (
      <div className="App">
        <div className="searchBox">
          <input type="text" value={search} onChange={handleChange} />
        </div>
        <div>
          <DisplayCards clickie={true} handleClick={handleClick} data={dynamicSearch()}/>
        </div>
        <div className="favBox">
          <DisplayCards clickie={false} data={favs} />
        </div>
      </div>
    );
}

export default App;
