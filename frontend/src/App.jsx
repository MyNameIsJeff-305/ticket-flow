import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from "./store/session";

import './components/Splash/Splash.css'
import './index.scss'

import { useEffect } from "react";

import LoginSignup from "./components/LoginSignup/LoginSignup";
import SideBar from "./components/Layout/SideBar";
import TopBar from "./components/Layout/TopBar/TopBar";
import Dashboard from "./components/Dashboard/Dashboard";
import Tickets from "./components/Tickets";
import MyWork from "./components/MyWork";
import TicketDetailsOld from "./components/TicketDetails";
import TicketDetails from "./components/Tickets/TicketDetails/TicketDetails";
import Employees from "./components/Employees/Employees";
import EmployeeDetails from "./components/Employees/EmployeeDetails";
import Clients from "./components/Clients/Clients";
import ClientDetails from "./components/Clients/ClientDetails";
import TrackingPage from "./components/TrackingPage/TrackingPage";
import Inventory from "./components/Inventory";
import PartDetails from "./components/Parts/PartDetails";

function Layout() {
  const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);
  const myTickets = useSelector(state => state.tickets.myTickets);
  const status = useSelector(state => state.status.allStatus);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
    // .then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-div-container">
      {
        sessionUser ? (
          <>
            <SideBar />
            <div className="main-panel">
              {/* <header className="main-header">
                <TopBar />
              </header> */}

              <main className='main-zone'>
                <div className="section-container">
                  <Outlet />
                </div>

                <div className="my-work-panel">
                  <MyWork myTickets={myTickets} status={status} />
                </div>
              </main>
            </div>
          </>
        ) : (
          <main className='main-zone-login'>
            <Outlet />
          </main>
        )
      }
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
      },
      {
        path: '/tickets/:ticketId/test',
        element: <TicketDetailsOld />
      },
      {
        path: '/employees',
        element: <Employees />
      },
      {
        path: '/employees/:employeeId',
        element: <EmployeeDetails />
      },
      {
        path: '/clients',
        element: <Clients />
      },
      {
        path: '/clients/:clientId',
        element: <ClientDetails />
      },
      {
        path: '/track/:ticketHashedId',
        element: <TrackingPage />
      },
      {
        path: '/inventory',
        element: <Inventory />
      },
      {
        path: '/inventory/:partId',
        element: <PartDetails />
      }
    ]
  }
])

function App() {

  return <RouterProvider router={router} />
}

export default App;