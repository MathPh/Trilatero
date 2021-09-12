import React, { useEffect, useState } from 'react';
import { RegularPolygon} from 'react-konva';

const Token = props => {
    const [posicao, setPosicao] = React.useState(props.posicaoIni);
    useEffect(() => {
        console.log(props.posicaoIni)
        setPosicao(props.posicaoIni)
    },[props.posicaoIni])

    return <RegularPolygon sides={6} x={posicao.posicao.x} y={posicao.posicao.y} radius={10} fill={"#000"} />
}

export default Token;
