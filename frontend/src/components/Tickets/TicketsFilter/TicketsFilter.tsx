import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

import { getAllStatusThunk } from '../../../store/status';
import { getAllClientsThunk } from '../../../store/clients';

import {
    LuSearch,
    LuCalendar,
    LuCalendar1,
    LuCalendarClock,
    LuCalendarDays,
    LuCalendarRange
} from "react-icons/lu";
import { MdFilterListOff } from "react-icons/md";
import { FaCheck, FaTicket } from "react-icons/fa6";

import OpenModalMenuItem from '../../Navigation/OpenModalMenuItem';
import DateRangeFilterModal from './DateRangeFilterModal';

import './TicketsFilter.scss';

const STATUSES: [{ id: number; name: string; color: string }, { id: number; name: string; color: string }, { id: number; name: string; color: string }, { id: number; name: string; color: string }] = [
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
    today: boolean;
    selectToday: () => void;
    last7Days: boolean;
    selectLast7Days: () => void;
    dateRange: { startDate: Date; endDate: Date } | null;
    selectDateRange: (range: { startDate: Date; endDate: Date }) => void;
}

export default function TicketsFilter({
    selectedStatus,
    toggleStatus,
    selectedClient,
    setSelectedClient,
    searchFilter,
    setSearchFilter,
    today,
    selectToday,
    last7Days,
    selectLast7Days,
    dateRange,
    selectDateRange,
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

    const dateFilterRef = useRef<HTMLDivElement>(null);
    const [showDateFilterDropdown, setShowDateFilterDropdown] = useState(false);

    useEffect(() => {
        if (!showDateFilterDropdown) return;
        const closeDropdown = (e: any) => {
            if (dateFilterRef.current && !dateFilterRef.current.contains(e.target)) {
                setShowDateFilterDropdown(false);
            }
        };
        document.addEventListener("click", closeDropdown);
        return () => document.removeEventListener("click", closeDropdown);
    }, [showDateFilterDropdown]);

    const toggleDateDropdown = (e: any) => {
        // e.preventDefault();
        e.stopPropagation();
        setShowDateFilterDropdown(!showDateFilterDropdown);
    };

    const handleSelectToday = () => {
        selectToday();
        setShowDateFilterDropdown(false);
    };

    const handleSelectLast7Days = () => {
        selectLast7Days();
        setShowDateFilterDropdown(false);
    };

    const handleSelectDateRange = (startDate: string, endDate: string) => {
        selectDateRange({ startDate: new Date(startDate), endDate: new Date(endDate) });
        setShowDateFilterDropdown(false);
    };

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(today || last7Days || dateRange !== null);
    }, [today, last7Days, dateRange]);

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

                <div className="date-filter">
                    <button type='button' className={`btn-date-filters ${active ? 'active' : ''}`} title='Date Filters' onClick={toggleDateDropdown}>
                        {
                            today ? <LuCalendar1 className='date-filter-icon' /> :
                                last7Days ? <LuCalendarClock className='date-filter-icon' /> :
                                    dateRange ? <LuCalendarRange className='date-filter-icon' /> :
                                        <LuCalendar className='date-filter-icon' />
                        }

                        <div className="badge"></div>
                    </button>

                    {showDateFilterDropdown && (
                        <div className="date-filters-dropdown" ref={dateFilterRef}>
                            <div className="date-filter-option" onClick={handleSelectToday}>
                                <LuCalendar1 className='date-filter-icon' />
                                <span>Today</span>

                                {today && <FaCheck className='date-filter-check-icon' />}
                            </div>

                            <div className="date-filter-option" onClick={handleSelectLast7Days}>
                                <LuCalendarClock className='date-filter-icon' />
                                <span>Last 7 Days</span>

                                {last7Days && <FaCheck className='date-filter-check-icon' />}
                            </div>

                            <OpenModalMenuItem
                                modalComponent={<DateRangeFilterModal currentRange={dateRange ? {
                                    startDate: dateRange.startDate.toISOString().split('T')[0],
                                    endDate: dateRange.endDate.toISOString().split('T')[0],
                                } : undefined} onSelectRange={handleSelectDateRange} />}
                            >
                                <div className="date-filter-option">
                                    <LuCalendarRange className='date-filter-icon' />
                                    <span>Date Range</span>

                                    {dateRange && <FaCheck className='date-filter-check-icon' />}
                                </div>
                            </OpenModalMenuItem>
                        </div>
                    )}
                </div>

                <div className="status-filter">
                    <div className='status-list-status-list'>
                        {STATUSES && STATUSES.map((stat: any) => (
                            <div className={`status-ticket ${selectedStatus.includes(stat.id) ? 'active' : ''}`} key={stat.id} title={stat.name} onClick={() => toggleStatus(stat.id)}>
                                <div className={'status-icon status-icon-' + stat.id}>
                                    <FaTicket />
                                </div>
                                {/* <span className={`status-name${selectedStatus.includes(stat.id) ? '-selected' : ''}`}>{stat.name}</span> */}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="spacer"></div>

                <div className="actions">
                    <div
                        className="btn-clear-filters"
                        onClick={clearFilters}
                        title='Clear Filters'
                    >
                        <MdFilterListOff />
                        <span>Clear Filters</span>
                    </div>
                </div>
            </div>
        </div>
    );
}