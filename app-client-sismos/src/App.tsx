import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { getFeature } from './api/feature';



function App() {
  const[acttive,setactive]=useState(false)

  useEffect(() => {
    async function fetchData() {
      const data = await getFeature(1, 10);
      console.log(data); 
    }
    fetchData();
  }, [acttive]);

  return (
    <div className="App">
      <header className="App-header">

      <button onClick={() => setactive(true)}>button</button>
      <button className="rounded-full m-2 p-2 text-white bg-gray-800" >Save Changes</button>

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
