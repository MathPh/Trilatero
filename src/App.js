import './App.css';
import React, { useEffect, useState } from 'react';
import Jogador from './componentes/Jogador.js';
import Carta from './componentes/Carta';
import Tabuleiro from './componentes/Tabuleiro.js';
import Territorio from './componentes/Territorio.js';


function App() {
  const [tam, setTam] = useState(8)
  const [passo, setPasso] = useState(0)
  const [territorio, setTerritorio] = useState(2)
  const [resultado, setResultado] = useState(0)
  const [resultadoFinal, setResultadoFinal] = useState(null)

  useEffect(() => {
     
  }, [tam, territorio])
  
  useEffect(() => {
     console.log(resultado)
  }, [resultado])

  function handleTamAum(){
    setTam(tam+1)
  }
  function handleTamDim(){
    setTam(tam-1)
  }

  function handleTerritorioAum(){
    setTerritorio(territorio+1)
  }
  function handleTerritorioDim(){
    setTerritorio(territorio-1)
  }


  function renovacaoDeVotos(carta){
    console.log(carta)
    setResultadoFinal(resultado)
    setResultado(carta)
    setPasso(passo + 1)
  }

  function handleConfirmar(nVotos){
    if(nVotos > 2){
      //setResultado({direcao:resultado.direcao,distancia:resultado.distancia,polaridade:resultado.polaridade})
      setResultado(prev => ({...prev, polaridade:"+"}))
      //setResultado({  carta.polaridade = "+"})
    } 
    else setResultado(prev => ({...prev, polaridade:"0"}))//carta.polaridade = "0"

    //setResultado(1)
  }

  function handleMentir(nVotos){
    if(nVotos > 2) setResultado(prev => ({...prev, polaridade:"0"}))//carta.polaridade = "0"
    else setResultado(prev => ({...prev, polaridade:"+"}))//carta.polaridade = "+"
    //setResultado(-1)
  }

  function handleTrucarChapeu(nVotos){
    if(nVotos > 2 && resultado.polaridade == "+") setResultado(prev => ({...prev, distancia:prev.distancia*2}))//carta.distancia *= 2
    if(nVotos <= 2 && resultado.polaridade == "0") setResultado(prev => ({...prev, polaridade:"-"}))//carta.polaridade = "-"

    if(nVotos > 2 && resultado.polaridade == "0") {
      resultado.distancia *= 2
      resultado.polaridade = "+"
      setResultado(prev => ({...prev, distancia:prev.distancia*2, polaridade:"+"}))
    }
    if(nVotos <= 2 && resultado.polaridade == "+"){
       setResultado(prev => ({...prev, polaridade:"-"}))//carta.polaridade = "-"
    }

    //setResultado(resultado*2)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class = "buttons">
          <button onClick={() => {handleTamAum()}}>+</button>
          <button onClick={() => {handleTamDim()}}>-</button>
        </div>
      <Tabuleiro tam={tam} offset={0} size={50} territorio={territorio} movimento={resultadoFinal}/>
      <Jogador renovarVotos={passo} handleConfirmar={handleConfirmar} handleMentir={handleMentir} handleTrucarChapeu={handleTrucarChapeu} resultado={resultado}/>
      <Carta renovacaoDeVotos={renovacaoDeVotos}/>
      <Territorio handleTerritorioAum={handleTerritorioAum} handleTerritorioDim={handleTerritorioDim}/>
      </header>
    </div>
  );
}

export default App;
