import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from "./store/session";

import './index.css'

import { useEffect, useState } from "react";

import LoginSignup from "./components/LoginSignup/LoginSignup";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./components/Dashboard/Dashboard";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);

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
        {isLoaded && <Outlet />}
      </main>
      <footer className="footer">
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
      }
    ]
  }
])

function App() {
  const [theme, setTheme] = useState('light');

  //Check Local Storage for saved Theme on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.className = savedTheme === 'dark' ? 'dark-mode' : 'light-mode';
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', newTheme);
  }

  return <RouterProvider router={router} />
}

export default App;