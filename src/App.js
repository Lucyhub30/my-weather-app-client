// Includes react module
import React, { useState, useEffect } from "react";

function App() {
  
  const [message, setMessage] = useState(""); 
  useEffect(() => {
    fetch("http://localhost:8000/weatherData")  
    .then(async (res) => { 
        const data = await res.json();
        setMessage(data);
      })
  }, []);
  
  
  
  return (

    //My app
    <div className="App">

      <div className="basicDisplay">
        <h1>Your Weather Station</h1>
        <p>App last updated...</p>
        <div className="temp">25</div>
        <div className="weatherCondition">Sunny</div>
      </div>
      <pre>{JSON.stringify(message, null, 2)}</pre>
    </div>

        
  );
}

export default App
