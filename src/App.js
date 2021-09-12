import './App.css';
import React, { useEffect, useState } from 'react';
import Jogador from './componentes/Jogador.js';
import Carta from './componentes/Carta';

const Canvas = props => {
  
  const canvasRef = React.useRef(null)
  var context = null
  useEffect(() => {
    const canvas = canvasRef.current
    if(context === null){
      context = canvas.getContext('2d')
    }

    context.strokeStyle = "white"
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();

    var tabuleiro = [[]]

    for (let index = 0; index < props.tam; index++) {

      for (let index2 = 0; index2 < 2*index+1; index2++) {
        if(index2%2==0)
          desenhaTri(index2, index,props.tam)
      }
    }
    
    
  })

  function desenhaQuad(x,y) {
    context.moveTo(props.offset + props.size*(x), props.offset+props.size*(y))
    context.lineTo(props.offset + props.size*(x+1), props.offset+props.size*(y))
    context.stroke()
    context.lineTo(props.offset + props.size*(x+1), props.offset+props.size*(y+1))
    context.stroke()
    context.lineTo(props.offset + props.size*(x), props.offset+props.size*(y+1))
    context.stroke()
    context.lineTo(props.offset + props.size*(x), props.offset+props.size*(y))
    context.stroke()
  }
  function desenhaTri(x,y, tam) {
    /*(lado * nTri) / 2
    (lado * nTri) / 2 - lado/2 == (lado * (nTri-1))/2
    (lado * nTri) / 2 - 2*lado/2
    (lado * nTri) / 2 - 3*lado/2*/

    const h = (props.size*Math.sqrt(3))/2

    /*  */
    context.moveTo(props.offset+ (props.size*(tam-y))/2 + (props.size*(x/2)),props.offset +h*(y))
    context.lineTo(props.offset+ (props.size*(tam-y))/2 + (props.size*(x/2-0.5)), props.offset +h*(y+1))
    context.stroke()
    context.lineTo(props.offset+ (props.size*(tam-y))/2 + (props.size*(x/2+0.5)), props.offset +h*(y+1))
    context.stroke()
    context.lineTo(props.offset+ (props.size*(tam-y))/2 + (props.size*(x/2)),props.offset +h*(y))
    context.stroke()

    /*/  

    context.moveTo(props.offset+ (props.size*(tam-y))/2,props.offset +h*(y))
    context.lineTo(props.offset+ (props.size*(tam-y))/2 - props.size/2, props.offset +h*(y+1))
    context.stroke()
    context.lineTo(props.offset+ (props.size*(tam-y))/2 + props.size/2, props.offset +h*(y+1))
    context.stroke()
    context.lineTo(props.offset+ (props.size*(tam-y))/2,props.offset +h*(y))
    context.stroke()
    /*  */

  }
  
  return <canvas ref={canvasRef} width={props.size*props.tam} height={((props.size*Math.sqrt(3))/2)*props.tam} style={{border:"1px solid #000000"}, {background: "#282c34"}}/>
}



function App() {
  const [tam, setTam] = useState(8)
  const [passo, setPasso] = useState(0)

  useEffect(() => {
    
  }, [tam])
  
  function handleTamAum(){
    setTam(tam+1)
  }
  function handleTamDim(){
    setTam(tam-1)
  }

  function renovacaoDeVotos(){
    setPasso(passo + 1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class = "buttons">
          <button onClick={() => {handleTamAum()}}>+</button>
          <button onClick={() => {handleTamDim()}}>-</button>
        </div>
      <Canvas tam={tam} offset={0} size={50} />
      <Jogador renovarVotos={passo}/>
      <Carta renovacaoDeVotos={renovacaoDeVotos}/>
      </header>
    </div>
  );
}

export default App;
