import { useNavigate } from 'react-router-dom';

import './NavLogo.css';

export default function NavLogo() {
    const navigate = useNavigate();

    const handleNavigate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/dashboard');
    }

    return (
        <div className='nav-logo-container' onClick={(e) => handleNavigate(e)}>
            <img src="/assets/logo-tf.png" className='logo-main' alt='logo'></img>
            <h1>ticketFlow</h1>
        </div>
    );
}