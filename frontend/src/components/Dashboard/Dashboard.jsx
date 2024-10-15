// import MyWork from "../MyWork";
import Statistics from "../Statistics/Statistics";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getMyTicketsThunk } from '../../store/tickets';
import { getAllStatusThunk } from '../../store/status';

import './Dashboard.css';
import MyAccount from "../MyAccount";

export default function Dashboard() {

    const dispatch = useDispatch();

    const myTickets = useSelector(state => state.tickets.myTickets);
    const status = useSelector(state => state.status.allStatus);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyTicketsThunk());
        dispatch(getAllStatusThunk());
    }, [dispatch]);

    if (!user) return (
        <section className="dashboard">
            <span className="loader"></span>
        </section>
    )

    return (
        <main className="dashboard">
            <div className="left-section-d">
                <Statistics myTickets={myTickets} status={status} />
            </div>
            <div className="right-section-d">
                <MyAccount user={user} />
            </div>
        </main>
    )
}