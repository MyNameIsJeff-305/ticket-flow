import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/session";
import { useNavigate } from "react-router-dom";

import "./ProfileControl.scss";
import { LuUserRound } from "react-icons/lu";
import { TbLogout } from "react-icons/tb";


export default function ProfileControl() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store: any) => store.session.user);

    const handleLogout = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(logout() as any)
            .then(() => {
                navigate("/");
            })
    };

    return (
        <div className="profile-control">
            <div className="avatar">
                {
                    // false?
                    user.profilePicUrl || user.user.profilePicUrl ?
                        <img src={user.profilePicUrl} alt="User Avatar" /> :
                        <LuUserRound className="user-icon" />
                }

            </div>

            <div className="user-info">
                <span className="first-name">{user.firstName}</span>
                <span className="username">{user.username}</span>
            </div>

            <div className="btn-logout" onClick={(e: any) => handleLogout(e)}>
                <TbLogout className="btn-icon-icon" />
            </div>

        </div >
    );
}