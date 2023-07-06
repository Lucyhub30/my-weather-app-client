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

      <div className="MainContent">
        <h1>Welcome to my weather station app!</h1>
        <p> This is where the data from your weather station will be displayed.</p>
        <pre>{JSON.stringify(message, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App