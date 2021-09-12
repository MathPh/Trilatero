import './Territorio.css';
import React, { useEffect, useState } from 'react';

export default function Terriorio(props){
   
    return(
        <div class = "caixa_botao_territorio">
            <button onClick={() => {props.handleTerritorioAum()}}>
                Aumentar Território
            </button>
            <button onClick={() => {props.handleTerritorioDim()}}>
                Diminuir Território
            </button>
        </div>
    );
}