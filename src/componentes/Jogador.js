import './Jogador.css';
import React, { useEffect, useState } from 'react';

export default function Jogador(props){
   
    const jogadoresIniciais = {
        "mesa":{"id":"mesa","veredito":"nulo"},
        "A":{"id":"A","veredito":"nulo"},
        "B":{"id":"B","veredito":"nulo"},
        "C":{"id":"C","veredito":"nulo"}}
    const listaAlfabetica = ["A","B","C"]
    const [renovar,setRenovar] = useState(1)
    const [jogador_1,setJogador1] = useState(0)
    const [jogador_2,setJogador2] = useState(0)
    const [jogador_3,setJogador3] = useState(0)
    const [voto, setVoto] = useState(jogadoresIniciais)
    const [eu, setEu] = useState(0)

    useEffect(() => {
        const [primeiro,segundo,terceiro] = shuffle(["A","B","C"])
        setJogador1(primeiro)
        setJogador2(segundo)
        setJogador3(terceiro)
        
    }, [renovar])

    useEffect(() => {
        console.log(voto)
    }, [voto])

    useEffect(() => {
         setVoto(jogadoresIniciais)
    }, [props.renovarVotos])

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

      function handleVotacao(id, veredito){
          setVoto(prev => ({...prev, [id]:{id: id, veredito: veredito}}))
          setVoto(prev => ({...prev, "mesa":
          {id: "mesa", "veredito": Math.round(Math.random())? "Sim": "Não"}}))
      }

      function aparecerBotoes(letraDoJogador){
          return(
              <div>
                <p>Jogador {(eu % 3) + 1}: {letraDoJogador}</p> 
                {voto.[letraDoJogador].veredito === "nulo" ?
                 <div>
                     <button onClick={() => {handleVotacao(letraDoJogador,"Sim")}}>
                         Sim
                     </button>
                     <button onClick={() => {handleVotacao(letraDoJogador,"Não")}}>
                         Não
                     </button>
                 </div>
                 :
                 <p>Seu voto foi {voto.[letraDoJogador].veredito}</p>
                 }
              </div>
          )
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
            {listaAlfabetica[eu % 3] === jogador_1 ?
             <div>
                {aparecerBotoes(jogador_1)}
             </div>
             : null}
            {listaAlfabetica[eu % 3] === jogador_2 ? 
            <div>
               {aparecerBotoes(jogador_2)}
            </div>
            : null}
            {listaAlfabetica[eu % 3] === jogador_3 ? 
            <div>
                {aparecerBotoes(jogador_3)}
            </div>
            : null}
        </div>
    );
}