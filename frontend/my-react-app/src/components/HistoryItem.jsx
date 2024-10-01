import React from "react";

function HistoryItem({title, amount, type }){
    const getTypeStyle = () => {
        if(type === 'income'){
            return 'text-color-green';
        } else if(type === 'expense'){
            return 'text-color-delete';
        }
    }


    return(
        <div className="flex justify-between items-center p-4">
            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="text-lg font-semibold">
                {type === 'income' && <h2 className={getTypeStyle()}>+${amount.toLocaleString()}</h2>}
                {type === 'expense' && <h2 className={getTypeStyle()}>-${amount.toLocaleString()}</h2>}
            </div>
     </div>
    );
}

export default HistoryItem;