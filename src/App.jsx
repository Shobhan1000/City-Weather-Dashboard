import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(name);
  }

  return (
    <>
      <h1>City Weather Dashboard</h1>
      <div className="card px-4 py-5">
        <form onSubmit={handleSubmit}>
          <label>
            Enter the city name:
            <input
              type="text" 
              value={name}
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className='weatherCard'>
        {/* Weather information will be displayed here */}
        <h1>Weather Information</h1>
      </div>
    </>
  )
}

export default App
