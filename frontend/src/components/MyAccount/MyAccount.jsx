import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { updateUserThunk } from '../../store/session';
import { FaPen } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

import './MyAccount.css';

export default function MyAccount({ user }) {
    const dispatch = useDispatch();

    const [profilePicUrl, setProfilePicUrl] = useState(user.profilePicUrl);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const newErrors = {};
        if (firstName.length > 0 && firstName.length < 2) {
            newErrors.firstName = 'First Name must be 2 characters or longer';
        }
        if (lastName.length > 0 && lastName.length < 2) {
            newErrors.lastName = 'Last Name must be 2 characters or longer';
        }
        if (password.length > 0 && password.length < 6) {
            newErrors.password = 'Password must be 6 characters or longer';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords must match';
        }
        setErrors(newErrors);
    }, [firstName, lastName, password, confirmPassword]);

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileURL = URL.createObjectURL(file);
            setProfilePicUrl(fileURL);
        }
    };

    const handleSave = async () => {
        if (selectedFile) {
            await dispatch(updateUserThunk(user.id, { password: password, confirmPassword: confirmPassword, firstName: firstName, lastName: lastName, img_url: selectedFile || profilePicUrl },))
            .then(() => {
                setIsEditing(false);
            })
        } else {
            setIsEditing(false);
        }
    };

    return (
        <section className="my-account-tab">
            <div className='my-account-header'>
                <h1>My Account</h1>
                <button
                    className='edit-cancel-button'
                    onClick={() => {
                        if (isEditing) {
                            handleSave();
                        } else {
                            setIsEditing(true);
                        }
                    }}
                >
                    {isEditing ? <FaSave /> : <FaPen />}
                </button>
            </div>
            <div className="account-details-container-main">
                <div className="account-picture-container">
                    <img src={profilePicUrl} alt="user-avatar" />
                    {isEditing && (
                        <input
                            type="file"
                            name='img_url'
                            onChange={updateFile}
                            accept='.jpg, .jpeg, .png'
                        />
                    )}
                </div>
                <div className="account-details-container" style={{ gap: "10px" }}>
                    <div className="details-1">
                        <span>First Name:</span>
                        <input
                            type="text"
                            defaultValue={user?.firstName}
                            disabled={!isEditing}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {
                            errors.firstName && <div className='error'>{errors.firstName}</div>
                        }
                    </div>
                    <div className="details-2">
                        <span>Last Name:</span>
                        <input
                            type="text"
                            defaultValue={user?.lastName}
                            disabled={!isEditing}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {
                            errors.lastName && <div className='error'>{errors.lastName}</div>
                        }
                    </div>
                    <div className="details-1">
                        <span>New Password:</span>
                        <input
                            type="password"
                            defaultValue={''}
                            disabled={!isEditing}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            errors.password && <div className='error'>{errors.password}</div>
                        }
                    </div>
                    <div className="details-2">
                        <span>Confirm New Password:</span>
                        <input
                            type="password"
                            defaultValue={''}
                            disabled={!isEditing}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {
                            errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}
