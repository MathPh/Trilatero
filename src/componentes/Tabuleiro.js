import React, { useEffect, useState } from 'react';
import { Stage, Layer, RegularPolygon, Text } from 'react-konva';

class PosicaoCls {
  constructor(id, x,y,paridade,canvas,lado){
    this.id = id;
    this.x = x
    this.y = y
    this.paridade = paridade % 2
    this.canvas = canvas
    this.lado = lado //global?

    //return <RegularPolygon />
    //cor?


  }

  draw3(){
    var h = (this.lado*Math.sqrt(3))/2;
    if(this.paridade % 2 == 1){

      this.canvas.lineWidth = 1;
      this.canvas.beginPath();

      this.canvas.moveTo (this.x-this.lado/2,this.y-h);
      this.canvas.lineTo (this.x+this.lado/2,this.y-h);
      this.canvas.lineTo (this.x,this.y);
      this.canvas.closePath ();
      this.canvas.stroke ();


    }else {
      this.canvas.lineWidth = 1;
      this.canvas.beginPath();

      this.canvas.moveTo (this.x,this.y-h);
      this.canvas.lineTo (this.x-this.lado/2,this.y);
      this.canvas.lineTo (this.x+this.lado/2,this.y);
      this.canvas.closePath ();
      this.canvas.fillStyle   ="red";
      this.canvas.fill ();
    }

}

  draw(){

    var h = (this.lado*Math.sqrt(3))/2;
    this.obj.lineWidth = 1;

    if(this.paridade % 2 == 1){

      this.obj.moveTo (this.x-this.lado/2,this.y-h);
      this.obj.lineTo (this.x+this.lado/2,this.y-h);
      this.obj.lineTo (this.x,this.y);


    }else {

      this.obj.moveTo (this.x,this.y-h);
      this.obj.lineTo (this.x-this.lado/2,this.y);
      this.obj.lineTo (this.x+this.lado/2,this.y);

    }

    this.obj.closePath ();
    this.obj.className = "abc";
    this.canvas.stroke (this.obj);

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
          
          setTabuleiro(prev => ([...prev, new PosicaoCls(index.toString() + "-" + index2.toString(), props.tam/2*(props.size*(Math.sqrt(3))) + ((index2 - index)*props.size*(Math.sqrt(3))/2), props.size*1.5*index-(index2%2==0?0:props.size/2) + props.size, index2, context, props.size)]))
          ii++
        }
      }
      
      
      console.log("Saida")
      
    },[props.tam])
  
    
    return <Stage width={props.size*props.tam*1.74} height={((props.size*props.tam*2))} >
      <Layer>
      {tabuleiro.map((tab) => (
          <RegularPolygon
            key={tab.id}
            id={tab.id}
            x={tab.x}
            y={tab.y}
            rotation={tab.paridade == 0?0:180}
            sides={3}
            radius={tab.lado}
            fill={tab.paridade == 0?"#89b717":"#900000"}
          />
        ))}
      </Layer>
    </Stage>

    //return <canvas ref={canvasRef} width={props.size*props.tam} height={((props.size*Math.sqrt(3))/2)*props.tam} style={{border:"1px solid #000000"}, {background: "#FFFFFF"}}/>
  }
  
  export default Tabuleiro;
  