import { useState } from 'react'
import './App.css'
import TurkeyMap, { SearchBar } from './components/TurkeyMap'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="fullscreen-container ">
      <div className="search-container">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <TurkeyMap
        searchTerm={searchTerm}
        customStyle={{
          idleColor: '#2e2e2e',
          hoverColor: '#FFF',
          strokeColor: '#242424'
        }}
        className="fullscreen-map"
      />
    </div>
  )
}

export default App
