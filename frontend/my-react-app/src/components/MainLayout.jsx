import React from 'react';

function MainLayout({children}) {
    return (
        <div className="p-8 h-full flex gap-8 font-sans text-primary-color2 flex-col" data-theme="synthwave">
        {children}
      </div>
    )
} 

export default MainLayout;