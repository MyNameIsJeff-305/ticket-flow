import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

import "./Clients.scss"

import { getAllClientsThunk, getTotalClientsAmountThunk } from "../../store/clients";
import ClientCard from '../ClientCard/ClientCard';
import AddClient from "./AddClient"
import { getMyTicketsThunk } from "../../store/tickets";
import { getAllStatusThunk } from "../../store/status";

const SORT_OPTIONS = [
    { label: 'firstName', value: 'ASC', description: "A-Z" },
    { label: 'firstName', value: 'DESC', description: "Z-A" }
]

export default function Clients() {
    const dispatch = useDispatch();

    const allClients = useSelector((state) => state.clients.allClients);
    const totalClients = useSelector((state) => state.clients.totalClientsAmount);

    const [page, setPage] = useState(1);
    const [deleteClientChecker, setDeleteClientChecker] = useState(false);
    const [clientsAddChecker, setClientsAddChecker] = useState(false);
    const [editClientChecker, setEditClientChecker] = useState(false);

    const CLIENTS_PER_PAGE = 10;

    useEffect(() => {
        dispatch(getTotalClientsAmountThunk());
        dispatch(getAllClientsThunk(page, CLIENTS_PER_PAGE, null));
        dispatch(getMyTicketsThunk());
        dispatch(getAllStatusThunk());
        setDeleteClientChecker(false);
        setClientsAddChecker(false);
        setEditClientChecker(false);
    }, [dispatch, page, clientsAddChecker, deleteClientChecker, editClientChecker]);

    const lastPage = Math.ceil(totalClients / CLIENTS_PER_PAGE);

    const onModalClose = () => {
        setDeleteClientChecker(true);
        setClientsAddChecker(true);
        setEditClientChecker(true);
    }

    if (!allClients || !totalClients)
        return (
            <section className="clients-tab">
                <div className="clients-tab-header">
                    <h1>Clients</h1>

                    <OpenModalMenuItem
                        modalComponent={<AddClient setClientsChecker={setClientsAddChecker} />}
                        onModalClose={onModalClose}
                        dismisable={false}
                    >
                        <div className="add-client-button">
                            <IoPersonAddOutline /> Add Client
                        </div>
                    </OpenModalMenuItem>
                </div>

                <div className="clients-list-container">
                    <section className="clients-tab">
                        <span className="loader"></span>
                    </section>
                </div>

                <div className='tickets-footer'>
                    <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><FaAngleLeft /></button>
                    <div>
                        <span >
                            {page} of {lastPage}
                        </span>
                    </div>
                    <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><FaAngleRight /></button>
                </div>
            </section>
        );

    return (
        <section className="clients-tab">
            <div className="clients-tab-header">
                <h1>Clients</h1>
                <OpenModalMenuItem
                    modalComponent={<AddClient setClientsChecker={setClientsAddChecker} />}
                    onModalClose={onModalClose}
                    dismisable={false}
                >
                    <div className="add-client-button">
                        <IoPersonAddOutline /> Add Client
                    </div>
                </OpenModalMenuItem>
            </div>

            <div className=""></div>

            <div className="clients-list-container">
                {allClients.map((client) => (
                    <ClientCard key={client.id} client={client} setEditClientChecker={setEditClientChecker} setDeleteClientChecker={setDeleteClientChecker} />
                ))}
            </div>

            <div className='clients-footer'>
                <button className='prev-btn' style={{ border: "none" }} disabled={page <= 1} onClick={() => setPage(page - 1)}><FaAngleLeft /></button>
                <div>
                    <span >
                        {page} of {lastPage}
                    </span>
                </div>
                <button className='next-btn' style={{ border: "none" }} disabled={page >= lastPage} onClick={() => setPage(page + 1)}><FaAngleRight /></button>
            </div>
        </section>
    )
}