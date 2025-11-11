import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getAllStatusThunk } from '../../../store/status';
import { getAllClientsThunk } from '../../../store/clients';

import { LuSearch } from "react-icons/lu";
import { MdFilterListOff } from "react-icons/md";
import { FaCheck, FaTicket } from "react-icons/fa6";

import './TicketsFilter.scss';

const STATUS: [{ id: number; name: string; color: string }, { id: number; name: string; color: string }, { id: number; name: string; color: string }, { id: number; name: string; color: string }] = [
    { id: 1, name: 'Open', color: '#FF6B6B' },
    { id: 2, name: 'In Progress', color: '#FFB84C' },
    { id: 4, name: 'Pending', color: '#7C3AED' },
    { id: 3, name: 'Closed', color: '#4CAF50' },
];

interface TicketsFilterProps {
    selectedStatus: number[];
    selectedClient: number | null;
    searchFilter: string;
    toggleStatus: (status: number) => void;
    clearFilters: () => void;
    setSelectedClient: (clientId: number | null) => void;
    setSearchFilter: (searchTerm: string) => void;
}

export default function TicketsFilter({
    selectedStatus,
    toggleStatus,
    selectedClient,
    setSelectedClient,
    searchFilter,
    setSearchFilter,
    clearFilters,
}: TicketsFilterProps) {

    const dispatch = useDispatch();

    const status = useSelector((state: any) => state.status.allStatus);
    const clients = useSelector((state: any) => state.clients.allClients);

    const [selectedClientLocal, setSelectedClientLocal] = useState<number | ''>('');

    useEffect(() => {
        dispatch(getAllStatusThunk() as any);
        dispatch(getAllClientsThunk(1, 10000) as any);
    }, [dispatch]);

    useEffect(() => {
        setSelectedClientLocal(selectedClient || '');
    }, [selectedClient]);

    return (
        <div className="tickets-filter-wrapper">
            <div className="tickets-filter">
                <div className="search-filter">
                    <div className="search-filter-wrapper">
                        <LuSearch className="search-filter-icon" />
                        <input type="text" placeholder="Title, description, etc..." className="search-tickets-filter-input" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
                    </div>
                </div>
                
                <div className="client-filter">
                    <select name="client_select" id="client-select-filter" className="client-select" value={selectedClientLocal} onChange={(e) => {
                        const value = e.target.value;
                        if (value === "") {
                            setSelectedClient(null);
                        } else {
                            setSelectedClient(Number(value));
                        }
                    }}>
                        <option value="">Select Client</option>
                        {clients && clients.map((client: any) => (
                            client.companyName ?
                                <option key={client.id} value={client.id}>{client.companyName}</option> :
                                <option key={client.id} value={client.id}>{client.firstName} {client.lastName}</option>
                        ))}
                    </select>
                </div>
                
                <div className="status-filter">
                    <div className='status-list-status-list'>
                        {STATUS && STATUS.map((stat: any) => (
                            <div className='status-ticket' key={stat.id} onClick={() => toggleStatus(stat.id)}>
                                <div className={`status-icon${selectedStatus.includes(stat.id) ? '-hovered' : ''}-${stat.id}`}>
                                    <FaTicket />
                                </div>
                                {/* <span className={`status-name${selectedStatus.includes(stat.id) ? '-selected' : ''}`}>{stat.name}</span> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="actions">
                    <div
                        className="btn-clear-filters"
                        onClick={clearFilters}
                    >
                        <MdFilterListOff />
                        Clear Filters
                    </div>
                </div>
            </div>
        </div>
    );
}