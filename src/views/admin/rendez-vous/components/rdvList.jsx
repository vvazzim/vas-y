import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import {MdAssignmentTurnedIn} from "react-icons/md";
import AjouterRDV from "./addRdv";
import {obtenirRdv} from "../../../../../src/api";


const RdvList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const [rdvs, setRdvs] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchRdvs = async () => {
            try {
                const response = await obtenirRdv();
                setRdvs(response);
            } catch (error) {
                console.error('Error fetching RDVs:', error);
            }
        };
        fetchRdvs();
    }, []);



    const formatRdvDate = (date) => {
        const dat = new Date(date);
        return dat.toISOString().split('T')[0];
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Implement search logic here
    }

    const getBackgroundColorClass = (statut) => {
        switch (statut) {
            case 'Confirmed':
                return 'bg-green-500';
            case 'Canceled':
                return 'bg-red-500';
            case 'En Attente':
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 dark:text-white">
            <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                <div className="mt-4 pl-2">

                    <div id="dropdownAction"
                         className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction"
                                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            <svg className="w-3 h-3 ml-2" aria-hidden="true" fill="none" stroke="currentColor"
                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownActionButton">
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reward</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Promote</a>
                            </li>
                            <li>
                                <a href="#"
                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Activate
                                    account</a>
                            </li>
                        </ul>
                        <div className="py-1">
                            <a href="#"
                               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete
                                User</a>
                        </div>
                    </div>
                </div>
                <button
                    className="inline-flex items-center text-white bg-blue-600 border border-transparent focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 ml-2"
                    type="button"
                    onClick={handleOpenModal}
                >
                    Ajouter RDV
                </button>
                {isModalOpen && <AjouterRDV closeModal={handleCloseModal} />}
                <div className="relative mt-4 pr-4">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor"
                             viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users"
                           className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="Search for users"/>
                </div>

                </div>
            <table className="table-auto w-full">
                <thead className="table-auto w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th scope="col" className="p-4">
                        <div className="flex items-center">
                            <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Nom
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Heure
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Statut
                    </th>
                    <th scope="col" className="px-6 py-3">

                    </th>
                </tr>
                </thead>
                <tbody>
                {rdvs.map((rdv, index) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                        <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id={`checkbox-table-search-${index}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">checkbox</label>
                            </div>
                        </td>
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                            <MdAssignmentTurnedIn size={24}/>
                            <div className="pl-3 text-left">
                                <div className="text-base font-semibold">{rdv.patient.nom}</div>
                                <div className="font-normal text-gray-500">{rdv.patient.prenom}</div>
                            </div>
                        </th>



                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                {formatRdvDate(rdv.date)}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            {rdv.heureDebut}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getBackgroundColorClass(rdv.statut)}`}/>
                                {rdv.statut}

                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RdvList;