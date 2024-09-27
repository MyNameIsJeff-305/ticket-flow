import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from "./store/session";

import './index.css'

import { useEffect, useState } from "react";

import LoginSignup from "./components/LoginSignup/LoginSignup";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer/Footer";
import Tickets from "./components/Tickets";
import MyWork from "./components/MyWork";
import TicketDetails from "./components/TicketDetails";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const myTickets = useSelector(state => state.tickets.myTickets);
  const status = useSelector(state => state.status.allStatus);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-div-container">
      <header className="header">
        {sessionUser && <Navigation />}
      </header>
      <main className='main-zone'>
        {
          sessionUser && (
            <div className="left-section-mm">
              <MyWork myTickets={myTickets} status={status} />
            </div>
          )
        }
        <div className="right-section-mm">
          {isLoaded && <Outlet />}
        </div>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LoginSignup />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/tickets',
        element: <Tickets />
      },
      {
        path: '/tickets/:ticketId',
        element: <TicketDetails />
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App;