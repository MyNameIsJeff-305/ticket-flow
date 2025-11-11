import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { HiSortAscending, HiSortDescending, HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa6";
import { LuTicketPlus } from "react-icons/lu";

import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import TicketsFilter from './TicketsFilter/TicketsFilter';

import './Tickets.css';

import { getAllTicketsThunk, getMyTicketsThunk, getTotalTicketsAmountThunk } from '../../store/tickets';
import TicketCard from './TicketCard';
import AddTicket from '../AddTicket/AddTicket';

const SORT_OPTIONS = [
    { label: 'createdAt', value: 'DESC', description: "Newest First" },
    { label: 'createdAt', value: 'ASC', description: "Oldest First" }
]

export default function Tickets() {

    const dispatch = useDispatch();

    const allTickets = useSelector(state => state.tickets.allTickets);
    const totalTickets = useSelector(state => state.tickets.totalTicketsAmount);

    const [page, setPage] = useState(1);
    const [deleteTicketChecker, setDeleteTicketChecker] = useState(false);
    const [ticketsChecker, setTicketsChecker] = useState(false);

    const [showFilters, setShowFilters] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);

    const TICKETS_PER_PAGE = 10;

    // Eliminado el estado innecesario para el debounce
    useEffect(() => {
    const handler = setTimeout(() => {
        dispatch(getAllTicketsThunk(page, TICKETS_PER_PAGE, {
            statusList: selectedStatus,
            client: selectedClient,
            search: searchFilter
        }, sortOption.label, sortOption.value));
        dispatch(getTotalTicketsAmountThunk());
    }, 500);
    return () => clearTimeout(handler);
}, [page, selectedStatus, selectedClient, searchFilter, sortOption, dispatch]);

    const toggleStatus = (status) => {
        if (selectedStatus.includes(status)) {
            setSelectedStatus(selectedStatus.filter(s => s !== status));
        } else {
            setSelectedStatus([...selectedStatus, status]);
        }
    }

    const clearFilters = () => {
        setSelectedStatus([]);
        setSearchFilter('');
        setSelectedClient(null);
    };


    useEffect(() => {
        dispatch(getTotalTicketsAmountThunk());
        dispatch(getAllTicketsThunk(page, TICKETS_PER_PAGE, {
            statusList: selectedStatus,
            client: selectedClient,
            search: searchFilter
        }, sortOption.label, sortOption.value));
        dispatch(getMyTicketsThunk());
        setDeleteTicketChecker(false);
        setTicketsChecker(false);

    }, [dispatch, page, ticketsChecker, deleteTicketChecker, sortOption, selectedStatus, selectedClient, searchFilter]);

    const lastPage = Math.ceil(totalTickets / TICKETS_PER_PAGE);

    const onModalClose = () => {
        setDeleteTicketChecker(true);
        setTicketsChecker(true);
    }

    const handleSortChange = () => {
        if (sortOption === SORT_OPTIONS[SORT_OPTIONS.length - 1]) {
            setSortOption(SORT_OPTIONS[0]);
            return;
        }

        const currentIndex = SORT_OPTIONS.findIndex(option => option.label === sortOption.label && option.value === sortOption.value);
        const selectedOption = SORT_OPTIONS[currentIndex + 1];
        setSortOption(selectedOption);
    }

    if (!allTickets || !totalTickets) return (
        <section className='tickets-tab'>
            <div>
                <div className="tickets-section-header">
                    <div className='tickets-header-left'>
                        <h1>Tickets</h1>
                    </div>

                    <div className="spacer"></div>

                    <OpenModalMenuItem
                        modalComponent={<AddTicket setTicketsChecker={setTicketsChecker} />}
                        onModalClose={onModalClose}
                    >
                        <button className="btn btn-add-item">
                            <LuTicketPlus /> Add Ticket
                        </button>
                    </OpenModalMenuItem>
                </div>

                <section className='tickets-tab'>
                    <span className="loader"></span>
                </section>
            </div>

            <div className='tickets-footer'>
                <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><HiOutlineChevronLeft /></button>
                <div>
                    <span >
                        {page} of {lastPage}
                    </span>
                </div>
                <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><HiOutlineChevronRight /></button>
            </div>
        </section>
    )

    return (
        <section className='tickets-tab'>
            <div className="tickets-section-header">
                <div className='tickets-header-left'>
                    <h1>Tickets</h1>
                    <div className='sorting-button' onClick={handleSortChange}>
                        {sortOption.description === 'Newest First' && (
                            <>
                                <HiSortDescending />
                                <p>Newest First</p>
                            </>
                        )}
                        {sortOption.description === 'Oldest First' && (
                            <>
                                <HiSortAscending />
                                <p>Oldest First</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="spacer"></div>

                <button className={`add-ticket-btn btn-toggle-filters ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
                    <FaAngleDown className='btn-icon' /> Filters
                </button>

                <OpenModalMenuItem
                    modalComponent={<AddTicket setTicketsChecker={setTicketsChecker} />}
                    onModalClose={onModalClose}
                >
                    <button className="add-ticket-btn">
                        <LuTicketPlus /> Add Ticket
                    </button>
                </OpenModalMenuItem>
            </div>

            {showFilters && <TicketsFilter
                selectedStatus={selectedStatus}
                selectedClient={selectedClient}
                searchFilter={searchFilter}
                toggleStatus={toggleStatus}
                clearFilters={clearFilters}
                setSelectedClient={setSelectedClient}
                setSearchFilter={setSearchFilter}
            />}

            <div className='tickets-container'>
                {allTickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} setDeleteTicketChecker={setDeleteTicketChecker} />
                ))}
            </div>

            <div className='tickets-footer'>
                <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><HiOutlineChevronLeft /></button>
                <div>
                    <span >
                        {page} of {lastPage}
                    </span>
                </div>
                <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><HiOutlineChevronRight /></button>
            </div>
        </section>
    )
}
