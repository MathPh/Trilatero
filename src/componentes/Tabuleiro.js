import React, { useEffect, useState } from 'react';
import { Stage, Layer, RegularPolygon, Text } from 'react-konva';

class Posicao {
  constructor(i,i2,raio,tam,novo_territorio){
    var territorio = novo_territorio

    this.a = i
    this.b = tam-i+Math.floor(0.5+i2/2)-1
    this.c = tam-i+Math.floor((2*i+1 - i2)/2)-1

    this.id = this.a + '-' + this.b + '-' + this.c;

    this.paridade = i2 % 2

    this.posicao = {'x':0,'y':0}
    this.posicao.x = tam/2*(raio*(Math.sqrt(3))) + ((i2 - i)*raio*(Math.sqrt(3))/2)
    this.posicao.y = raio*1.5*i-(this.paridade==0?0:raio/2)+raio
    
    this.raio = raio //global?

    this.cor = {'r':255,'g':255,'b':255}

    if(this.a <= territorio){
      this.cor.g -= 50
      this.cor.b -= 50
    }
    if(this.b <= territorio){
      this.cor.r -= 50
      this.cor.b -= 50
    }
    if(this.c <= territorio){
      this.cor.r -= 50
      this.cor.g -= 50
    }

    if(this.paridade == 0){
      this.cor.r -=50
      this.cor.b -=50
      this.cor.g -=50
    }


  }

} 

const Tabuleiro = props => {
  
    const canvasRef = React.useRef(null)

    const [tabuleiro, setTabuleiro] = React.useState([]);

    var context = null
    useEffect(() => {
      
  
      
      var ii = 0
      setTabuleiro([])
      for (let index = 0; index < props.tam; index++) {
        for (let index2 = 0; index2 < 2*index+1; index2++) {
          //tabAux.push(new PosicaoCls(index.toString() + "-" + index2.toString(), props.tam/2*props.size + ((index2 - index)*props.size/2), index*(props.size*Math.sqrt(3))/2, index2, context, props.size))
          
          setTabuleiro(prev => ([...prev, new Posicao( index,index2, props.size,props.tam,props.territorio)]))
          ii++
        }
      }
      
      
      
    },[props.tam, props.territorio])
  
    
    return <Stage width={props.size*props.tam*1.74} height={((props.size*props.tam*2))} >
      <Layer>
      {tabuleiro.map((tab) => (
          <RegularPolygon
            key={tab.id}
            id={tab.id}
            x={tab.posicao.x}
            y={tab.posicao.y}
            rotation={tab.paridade == 0?0:180}
            sides={3}
            radius={tab.raio}
            fill={"rgb("+tab.cor.r.toString()+", "+tab.cor.g.toString()+", "+tab.cor.b.toString()+")"}
          />
        ))}
      </Layer>
    </Stage>

    //return <canvas ref={canvasRef} width={props.size*props.tam} height={((props.size*Math.sqrt(3))/2)*props.tam} style={{border:"1px solid #000000"}, {background: "#FFFFFF"}}/>
  }
  
  export default Tabuleiro;
  