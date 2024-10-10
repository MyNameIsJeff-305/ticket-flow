import {useNavigate} from 'react-router-dom';

// import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import IconThemeSwitch from '../IconThemeSwitch';

const Header = () => {

    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="logo" onClick={() => navigate('/')}>
                <img src='/assets/logo-tf.png' alt='logo'/>
                <h1>ticketFlow</h1>
            </div>
            
            <div className="cta">
                <IconThemeSwitch />
            </div>
        </header>
    );
};

export default Header;
