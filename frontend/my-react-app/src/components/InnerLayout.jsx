import React from 'react';

function innerLayout({children}) {
    return (
        <div>
            <div className="p-8 px-6 w-full font-sans">
            {children}
            </div>
      </div>
      
    )
}

export default innerLayout;