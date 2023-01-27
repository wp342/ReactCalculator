import React from 'react';

function RenderHistory({calcHistory}) {
    return (
        calcHistory.map(calcHis => {
            return <div> {calcHis.number1} {calcHis.operation} {calcHis.number2} = {calcHis.answer} </div>
        })

    );
}

export default RenderHistory;