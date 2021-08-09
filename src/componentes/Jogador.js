import './Jogador.css';
import React, { useEffect, useState } from 'react';

export default function Jogador(props){
   
    const [renovar,setRenovar] = useState(1)
    const [jogador_1,setJogador1] = useState(0)
    const [jogador_2,setJogador2] = useState(0)
    const [jogador_3,setJogador3] = useState(0)
    const [eu, setEu] = useState(0)

    useEffect(() => {
        const [primeiro,segundo,terceiro] = shuffle(["A","B","C"])
        setJogador1(primeiro)
        setJogador2(segundo)
        setJogador3(terceiro)
    }, [renovar])

    //https://stackoverflow.com/a/2450976/9295348

    function shuffle(array) {
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
      function handleRenovar(){
          setRenovar(renovar*-1)
      }

      function handleVisualizarJogador(){
          setEu(eu+1)
      }

    return(
        <div class = "caixa_jogador">
            <button onClick={() => {handleRenovar()}}>
                RENOVAR
            </button>
            <button onClick={() => {handleVisualizarJogador()}}>
                Trocar de Jogador
            </button>
            <p>Informações sobre jogador</p>
            {eu % 3 === 1 ? <p>Jogador 1: {jogador_1}</p> : null}
            {eu % 3 === 2 ? <p>Jogador 2: {jogador_2}</p> : null}
            {eu % 3 === 0 ? <p>Jogador 3: {jogador_3}</p> : null}
        </div>
    );
}