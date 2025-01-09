import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faSitemap, faPenNib, faChartLine, faGifts, faDice, faBuildingColumns, faQuestion, faHome, faUtensils, faTshirt, faFileInvoice, faCapsules, faFilm, faBus } from '@fortawesome/free-solid-svg-icons';

function IncomeItem({
    id,
    title,
    amount,
    category,
    description,
    date,
    deleteItem,
    type


    }){

    const categoryIcon = () => {
        switch(category){
            case 'salary':
                return (
                    <FontAwesomeIcon icon={faBriefcase} />
                );
            case 'business':
                return (
                    <FontAwesomeIcon icon={faSitemap} />
                );
            case 'freelancing':
                return (
                    <FontAwesomeIcon icon={faPenNib} />
                );
            case 'investments':
                return (
                    <FontAwesomeIcon icon={faChartLine} />
                );
            case 'gifts':
                return (
                    <FontAwesomeIcon icon={faGifts} />
                );
            case 'gambling':
                return (
                    <FontAwesomeIcon icon={faDice} />
                );
            case 'bank':
                return (
                    <FontAwesomeIcon icon={faBuildingColumns} />
                );
            case 'other':
                return (
                    <FontAwesomeIcon icon={faQuestion} />
                );
            default:
                return (
                    ''
                );
        }       
    }

    const expenseCategoryIcon = () => {
        switch(category){
            case 'food':
                return (
                    <FontAwesomeIcon icon={faUtensils} />
                );
            case 'clothes':
                return (
                    <FontAwesomeIcon icon={faTshirt} />
                );
            case 'bills':
                return (
                    <FontAwesomeIcon icon={faFileInvoice} />
                );
            case 'transport':
                return (
                    <FontAwesomeIcon icon={faBus} />
                );
            case 'entertainment':
                return (
                    <FontAwesomeIcon icon={faFilm} />
                );
            case 'health':
                return (
                    <FontAwesomeIcon icon={faCapsules} />
                );
            case 'other':
                return (
                    <FontAwesomeIcon icon={faQuestion} />
                );
            default:
                return (
                    ''
                );
        }       
    }

    return (
        <div className="bg-white border border-gray-300 rounded-lg mb-4 flex items-center p-4 w-11/12 mx-auto text-gray-800 shadow-sm">
            <div className="icon mr-6">
                {type === 'expense' ? expenseCategoryIcon() : categoryIcon()}
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                    <h5 className="text-lg font-semibold">{title}</h5>
                    <button className="text-red-500" onClick={() => deleteItem(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <p className="flex items-center text-green-500 gap-2">
                            ${amount}
                        </p>
                        <p className="flex items-center text-gray-500 gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                            </svg>
                            {date}
                        </p>
                    </div>
                </div>
                <p className="mt-2 text-gray-600">{description}</p>
            </div>
        </div>
    );
}

export default IncomeItem;