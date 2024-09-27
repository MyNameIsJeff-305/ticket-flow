import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useNavigate } from "react-router-dom";

import "./ProfileButton.css";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(logout())
      .then(() => {
        closeMenu();
      })
      .then(() => {
        navigate("/");
      })
  };

  return (
    <div className="profile-container">
      <div className="container-left">
        <span className="welcome-message">Welcome, {user.firstName}</span>
        <span className="log-out" onClick={handleLogout}>Log Out</span>
      </div>
      <div className="container-right">
        {
          user.profilePicUrl ?
            <div onClick={toggleMenu}>
              <img src={user.profilePicUrl} onClick={toggleMenu} alt="Profile Picture" />
            </div> :
            <div className="fallback-profile" onClick={toggleMenu}>{`${user.firstName[0]}${user.lastName[0]}`}</div>
        }
      </div>
    </div>
  );
}

export default ProfileButton;
