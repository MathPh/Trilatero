import './Carta.css';
import React, { useEffect, useState } from 'react';

export default function Jogador(props){
   
    const [renovarCarta,setRenovarCarta] = useState(1)
    const [carta, setCarta] = useState(null)

    useEffect(() => {
        const [direcaonova] = shuffle(["AB","BC","AC"])
        var cartaAux = {direcao:direcaonova, distancia:distribuirValorAleatorio(), polaridade:""}
        setCarta(cartaAux)
        
    }, [renovarCarta])

    useEffect(() =>{
        props.renovacaoDeVotos(carta)
    },[carta])

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

      function distribuirValorAleatorio(){
        //https://stackoverflow.com/a/918827/9295348
        const valorMinimo = 2
        const valorMaximo = 9
        const y = Math.random()
        const n = 2
        const resultado = [(valorMaximo^(n+1) - valorMinimo^(n+1))*y + valorMinimo^(n+1)]^(1/(n+1))
        if(resultado === 0){
            return(distribuirValorAleatorio())
        }
        return(resultado)
      }
      
      function handlePuxarCarta(){
          setRenovarCarta(renovarCarta*-1)
          
      }

    return(
        <div class = "caixa_carta">
            <button onClick={() => {handlePuxarCarta()}}>
                Puxar carta
            </button>
            <p>Carta: {carta?.direcao}</p>
            <p>Valor: {carta?.distancia}</p>
        </div>
    );
}