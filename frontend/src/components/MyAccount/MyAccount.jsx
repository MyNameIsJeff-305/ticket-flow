// import { useState } from 'react';

import { FaPen } from "react-icons/fa6";

import './MyAccount.css'

export default function MyAccount({ user }) {

    // const [firstName, setFirstName] = useState(user.firstName);
    // const [lastName, setLastName] = useState(user.lastName);

    return (
        <section className="my-account-tab">
            <div className='my-account-header'>
                <h1>My Account</h1>
                <button className='edit-cancel-button' disabled="true">
                    <FaPen />
                </button>
            </div>
            <div className="account-details-container">
                <div className="account-picture-container">
                    <img src={user.profilePicUrl} alt="user-avatar" />
                </div>
                <div className="account-details-container">
                    <div className="details-1">
                        <span>First Name:</span>
                        <input type="text" value={user.firstName} disabled="true"></input>
                    </div>
                    <div className="details-2">
                        <span>Last Name:</span>
                        <input type="text" value={user.lastName} disabled="true"></input>
                    </div>
                </div>
            </div>
        </section>
    );
}