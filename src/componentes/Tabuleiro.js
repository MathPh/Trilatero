import React, { useEffect, useState } from 'react';
import { Stage, Layer, RegularPolygon, Text } from 'react-konva';
import Token from './Token.js'

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

  distancia(posicao){
    
    return Math.abs(this.a - posicao.a) + Math.abs(this.b - posicao.b) + Math.abs(this.c - posicao.c);
  }

} 

const Tabuleiro = props => {
  
    const canvasRef = React.useRef(null)

    const [tabuleiro, setTabuleiro] = React.useState([]);
    const [posicaoToken, setPosicaoToken] = React.useState(new Posicao(0,0,0,0,0))
    var context = null
    useEffect(() => {
      
  
      var ii = 0
      setTabuleiro([])
      for (let index = 0; index < props.tam; index++) {
        for (let index2 = 0; index2 < 2*index+1; index2++) {
          
          setTabuleiro(prev => ([...prev, new Posicao( index,index2, props.size,props.tam,props.territorio)]))

          ii++
        }
      }
      
      
      
    },[props.tam, props.territorio])

    useEffect(() => {
      console.log((props.tam - 1))
      //console.log(Math.floor(((props.tam - 1)/3)*2 + ((props.tam - 1) % 3)))
      const valor = Math.floor(((props.tam - 1)/3)*2 + ((props.tam - 1) % 3))
      const identidade = valor+"-"+valor+"-"+valor
      console.log(identidade)
      console.log(tabuleiro.find(item => item.id == identidade))

      if(tabuleiro.length > 0)
        if((props.tam - 1)%3 == 2){
          setPosicaoToken(tabuleiro[Math.floor(tabuleiro.length/2)])
        } else {
          setPosicaoToken(tabuleiro.find(item => item.id == identidade))
        }
    },[tabuleiro])

    useEffect(() => {
      if(props.movimento !== null){
        moveToken(props.movimento)
      }
    }, [props.movimento])

    function moveToken(carta){
      
      var novaPos
      var pos = null
      var d = carta.distancia

      if(carta.polaridade == "-"){
        if(carta.direcao == "BC"){

          if(d > posicaoToken.a) d = posicaoToken.a

          var a = posicaoToken.a-d
          var b = posicaoToken.b+Math.floor((d+1-posicaoToken.paridade)/2)
          var c = posicaoToken.c+Math.floor((d+1-posicaoToken.paridade)/2)

          novaPos = {a: a, b: b, c: c}
        } else if(carta.direcao == "AC"){

          if(d > posicaoToken.b) d = posicaoToken.b

          var a = posicaoToken.a+Math.floor((d+1-posicaoToken.paridade)/2)
          var b = posicaoToken.b-d
          var c = posicaoToken.c+Math.floor((d+1-posicaoToken.paridade)/2)

          novaPos = {a: a, b: b, c: c}
        } else if(carta.direcao == "AB"){

          if(d > posicaoToken.c) d = posicaoToken.c

          var a = posicaoToken.a+Math.floor((d+1-posicaoToken.paridade)/2)
          var b = posicaoToken.b+Math.floor((d+1-posicaoToken.paridade)/2)
          var c = posicaoToken.c-d

          novaPos = {a: a, b: b, c: c}
        }

      } else if(carta.polaridade == "+"){
        if(carta.direcao == "BC"){
          
          if(d + posicaoToken.a >= props.tam) d = props.tam - posicaoToken.a -1

          var a = posicaoToken.a+d
          var b = posicaoToken.b-Math.floor((d+posicaoToken.paridade)/2)
          var c = posicaoToken.c-Math.floor((d+posicaoToken.paridade)/2)

          novaPos = {a: a, b: b, c: c}
        } else if(carta.direcao == "AC"){

          if(d + posicaoToken.b >= props.tam) d = props.tam - posicaoToken.b -1

          var a = posicaoToken.a-Math.floor((d+posicaoToken.paridade)/2)
          var b = posicaoToken.b+d
          var c = posicaoToken.c-Math.floor((d+posicaoToken.paridade)/2)

          novaPos = {a: a, b: b, c: c}
        } else if(carta.direcao == "AB"){

          if(d + posicaoToken.c >= props.tam) d = props.tam - posicaoToken.c -1

          var a = posicaoToken.a-Math.floor((d+posicaoToken.paridade)/2)
          var b = posicaoToken.b-Math.floor((d+posicaoToken.paridade)/2)
          var c = posicaoToken.c+d

          novaPos = {a: a, b: b, c: c}
        }

      } else return

      for (const p of tabuleiro){
        if (p.distancia(novaPos) == 0) pos = p
      }
      console.log(novaPos)
      console.log(pos)
      if(pos !== null){
        setPosicaoToken(pos)
      }
    }
    
    return (<Stage width={props.size*props.tam*1.74} height={((props.size*props.tam*2))} >
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
        <Token posicao={posicaoToken} key="Token" />
      </Layer>
    </Stage>);

    //return <canvas ref={canvasRef} width={props.size*props.tam} height={((props.size*Math.sqrt(3))/2)*props.tam} style={{border:"1px solid #000000"}, {background: "#FFFFFF"}}/>
  }
  
  export default Tabuleiro;
  