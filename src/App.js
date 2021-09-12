import './App.css';
import React, { useEffect, useState } from 'react';
import Jogador from './componentes/Jogador.js';
import Carta from './componentes/Carta';
import Tabuleiro from './componentes/Tabuleiro.js';




function App() {
  const [tam, setTam] = useState(8)

  useEffect(() => {
    
  }, [tam])
  
  function handleTamAum(){
    setTam(tam+1)
  }
  function handleTamDim(){
    setTam(tam-1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class = "buttons">
          <button onClick={() => {handleTamAum()}}>+</button>
          <button onClick={() => {handleTamDim()}}>-</button>
        </div>
      <Tabuleiro tam={tam} offset={0} size={50} />
      <Jogador/>
      <Carta/>
      </header>
    </div>
  );
}

export default App;
