import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

import "./Clients.css";

import { getAllClientsThunk, getTotalClientsAmountThunk } from "../../store/clients";
import ClientCard from '../ClientCard/ClientCard';
import AddClient from "../AddClient";
import { getMyTicketsThunk } from "../../store/tickets";
import { getAllStatusThunk } from "../../store/status";


export default function Clients() {
    const dispatch = useDispatch();

    const allClients = useSelector((state) => state.clients.allClients);
    const totalClients = useSelector((state) => state.clients.totalClientsAmount);

    const [page, setPage] = useState(1);
    const [deleteClientChecker, setDeleteClientChecker] = useState(false);
    const [clientsAddChecker, setClientsAddChecker] = useState(false);
    const [editClientChecker, setEditClientChecker] = useState(false);

    const CLIENTS_PER_PAGE = 8;

    useEffect(() => {
        dispatch(getTotalClientsAmountThunk());
        dispatch(getAllClientsThunk(page, CLIENTS_PER_PAGE));
        dispatch(getMyTicketsThunk());
        dispatch(getAllStatusThunk());
        setDeleteClientChecker(false);
        setClientsAddChecker(false);
        setEditClientChecker(false);
    }, [dispatch, page, clientsAddChecker, deleteClientChecker, editClientChecker]);

    console.log(totalClients, "totalClients");

    const lastPage = Math.ceil(totalClients / CLIENTS_PER_PAGE);

    if (!allClients || !totalClients)
        return (
            <section className="clients-tab">
                <span className="loader"></span>
            </section>
        );

    const onModalClose = () => {
        setDeleteClientChecker(true);
        setClientsAddChecker(true);
        setEditClientChecker(true);
    }

    return (
        <section className="clients-tab">
            <div>
                <div className={`tickets-header`}>
                    <h1>Clients</h1>
                    <div className='add-ticket-btn' style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: "5px" }}>
                        <FaCirclePlus />
                        <OpenModalMenuItem
                            itemText={"Add Client"}
                            modalComponent={<AddClient setClientsChecker={setClientsAddChecker} />}
                            onModalClose={onModalClose}
                        />
                    </div>
                </div>
                <div className="clients-container">
                    <div>
                        {allClients.map((client) => (
                            <ClientCard key={client.id} client={client} setEditClientChecker={setEditClientChecker} setDeleteClientChecker={setDeleteClientChecker} />
                        ))}
                    </div>
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
            </div>
        </section>
    )
}