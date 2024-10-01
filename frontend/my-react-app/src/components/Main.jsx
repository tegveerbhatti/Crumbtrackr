import React from 'react';

function Main({children}) {
    return (
        <div className="flex-1 bg-color-white border-solid border-white backdrop-blur-sm rounded-3xl overflow-auto overflow-x-hidden grow flex-col flex font-sans text-primary-color2 p-4 m-4">
            {children}
        </div>
    )
}

export default Main;