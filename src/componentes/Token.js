import React, { useEffect, useState } from 'react';
import { RegularPolygon} from 'react-konva';
import useImage from 'use-image';
import imagem from '../assets/token.jpg'

const Token = props => {
    const [image] = useImage(imagem)
    const [posicao, setPosicao] = React.useState(props.posicaoIni);
    useEffect(() => {
        console.log(props.posicaoIni)
        setPosicao(props.posicaoIni)
    },[props.posicaoIni])

    return <RegularPolygon 
    sides={6} 
    x={posicao.posicao.x} 
    y={posicao.posicao.y} 
    radius={20} 
    fillPatternImage = {image}
    fillPatternOffsetX = {-250}
    fillPatternOffsetY = {-300}
    fillPatternScaleX = {0.1}
    fillPatternScaleY = {0.1}
    draggable = {1}
    />
}

export default Token;
