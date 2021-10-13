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
    const [jogador_0,setJogador0] = useState({"id":0, "letra":null})
    const [jogador_1,setJogador1] = useState({"id":1, "letra":null})
    const [jogador_2,setJogador2] = useState({"id":2, "letra":null})
    const [voto, setVoto] = useState(jogadoresIniciais)
    const [eu, setEu] = useState(0)

    useEffect(() => {
        const [primeiro,segundo,terceiro] = shuffle(["A","B","C"])
        setJogador0({"id":0, "letra":primeiro})
        setJogador1({"id":1, "letra":segundo})
        setJogador2({"id":2, "letra":terceiro})
        setVoto(jogadoresIniciais)
    }, [renovar])

    useEffect(() => {
        console.log(voto)
    }, [voto])

    useEffect(() => {
        setVoto(jogadoresIniciais)
    }, [props.renovarVotos])

    useEffect(() => {
        console.log("valor dealer: ",props.renovarVotos % 3);
        console.log("eu: ", eu % 3);
    }, [eu, props.renovarVotos])

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

      function aparecerBotoes(jogadores){
          return(
              <div>
                <p>Jogador {jogadores.id}: {jogadores.letra}</p> 
                {voto.[jogadores.letra].veredito === "nulo" ?
                 <div>
                     <button onClick={() => {handleVotacao(jogadores.letra,"Sim")}}>
                         Sim
                     </button>
                     <button onClick={() => {handleVotacao(jogadores.letra,"Não")}}>
                         Não
                     </button>
                 </div>
                 :
                 <p>Seu voto foi {voto.[jogadores.letra].veredito}</p>
                 }
              </div>
          )
      }

    return(
        <div class = "caixa_jogador">
            <button onClick={() => {handleRenovar()}}>
                Novo jogo 
                <br/>
                com novos jogadores
            </button>
            <button onClick={() => {handleVisualizarJogador()}}>
                Trocar de Jogador
            </button>
            <p>Informações sobre jogador</p>
            {listaAlfabetica[eu % 3 ] === jogador_0.letra ?
             <div>
                {aparecerBotoes(jogador_0)}
             </div>
             : null}
            {listaAlfabetica[eu % 3] === jogador_1.letra ? 
            <div>
               {aparecerBotoes(jogador_1)}
            </div>
            : null}
            {listaAlfabetica[eu % 3] === jogador_2.letra ? 
            <div>
                {aparecerBotoes(jogador_2)}
            </div>
            : null}
            {voto["A"].veredito != "nulo"
            & voto["B"].veredito != "nulo"
            & voto["C"].veredito != "nulo"
            & voto["mesa"].veredito != "nulo"  ? 
                <div>{props.renovarVotos % 3 == eu % 3 ? 
                    <div>
                <a></a>
                <a>CHAPEU</a>
                <p>
                    <a>Sim: </a>
                    <a>
                        {
                        (voto["A"].veredito == "Sim" ? 1:0)
                        +(voto["B"].veredito == "Sim" ? 1:0)
                        +(voto["C"].veredito == "Sim" ? 1:0)
                        +(voto["mesa"].veredito == "Sim" ? 1:0)
                        }
                    </a>
                </p>
                <p>
                    <a>Não: </a>
                    <a>
                        {
                        (voto["A"].veredito == "Não" ? 1:0)
                        +(voto["B"].veredito == "Não" ? 1:0)
                        +(voto["C"].veredito == "Não" ? 1:0)
                        +(voto["mesa"].veredito == "Não" ? 1:0)
                        }
                    </a>
                </p>
                <button onClick={() => {props.handleConfirmar()}}>
                    Confirmar
                </button>
                <button onClick={() => {props.handleMentir()}}>
                    Mentir
                </button>
            </div>
                    : 
                    <div> 
                        {Math.abs(props.resultado) == 1 ?
                        <button onClick={() => {props.handleTrucarChapeu()}}>
                            Truco o Chapeu
                        </button> : null
                        }
                    </div>
                    }
                </div>
            : null}
        </div>
    );
}