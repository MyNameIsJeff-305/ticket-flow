import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserThunk, getAllUsersThunk } from '../../../store/session';
import { useModal } from '../../../context/Modal';

import './EditEmployee.scss';
import { useParams } from 'react-router-dom';

export default function EditEmployee({ employee, setEditEmployeeChecker }) {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [username, setUsername] = useState(employee.username);
    const [email, setEmail] = useState(employee.email);
    const [profilePicUrl, setProfilePicUrl] = useState(employee.profilePicUrl);
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const { closeModal } = useModal();
    const { employeeId } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                await dispatch(getAllUsersThunk());
            }
            finally {
                setFirstName(employee.firstName || "");
                setLastName(employee.lastName || "");
                setUsername(employee.username || "");
                setEmail(employee.email || "");
                setProfilePicUrl(employee.profilePicUrl || "");
            }
        };

        if (!employee || employee.id !== employee.id) {
            fetchUser();
        } else {
            setFirstName(employee.firstName || "");
            setLastName(employee.lastName || "");
            setUsername(employee.username || "");
            setEmail(employee.email || "");
            setProfilePicUrl(employee.profilePicUrl || "");
        }
    }, [employeeId, employee, dispatch]);

    useEffect(() => {
        let newErrors = {};

        if (!firstName || firstName === '') {
            newErrors.firstName = "Please enter a valid first name";
        }
        if (!lastName || lastName === '') {
            newErrors.lastName = "Please enter a valid last name";
        }
        if (!username || username === '') {
            newErrors.username = "Please enter a valid username";
        }
        if (username.includes('@')) {
            newErrors.username = "Username cannot contain '@' or be an email";
        }
        if (username.length < 4) {
            newErrors.username = "Username must be at least 4 characters long";
        }
        if (username.length > 30) {
            newErrors.username = "Username cannot be longer than 30 characters";
        }
        if (!email || email === '' || !email.includes('@')) {
            newErrors.email = "Please enter a valid email";
        }
        if (email.length < 3) {
            newErrors.email = "Email must be at least 3 characters long";
        }
        if (email.length > 256) {
            newErrors.email = "Email cannot be longer than 256 characters";
        }

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [firstName, lastName, username, email]);

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileURL = URL.createObjectURL(file);
            setProfilePicUrl(fileURL);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const updatedUser = {
            firstName,
            lastName,
            username,
            email,
            profilePicUrl: selectedFile || profilePicUrl
        }

        const data = await dispatch(updateUserThunk(employee.id, updatedUser));
        if (data && data.errors) {
            setErrors(data.errors);
        } else {
            setEditEmployeeChecker(true);
            closeModal();
        }
    }

    return (
        <div className='edit-user-container'>
            <div className='edit-user-header'>
                <h1>Edit Employee</h1>
            </div>
            <form className='edit-user-form' onSubmit={handleSubmit}>
                <div className='edit-user-content'>
                    <div className='edit-user-left'>
                        <div className="image-wrapper" onClick={() => document.getElementById('hiddenAddFileInput').click()}>
                            <img
                                src={profilePicUrl}
                                alt="user-avatar"
                                className="user-image"
                            />
                            <div className="image-overlay">Click to upload</div>
                        </div>
                        <input
                            id="hiddenAddFileInput"
                            type="file"
                            name="img_url"
                            capture="environment"
                            accept=".jpg, .jpeg, .png"
                            onChange={updateFile}
                            style={{ display: 'none' }}
                        />
                    </div>
                    <div className='edit-user-right'>
                        <div className='first-last-name'>
                            <div className='edit-user-input'>
                                <label>First Name*</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                {errors.firstName && <span className="error">{errors.firstName}</span>}
                            </div>
                            <div className='edit-user-input'>
                                <label>Last Name*</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                {errors.lastName && <span className="error">{errors.lastName}</span>}
                            </div>
                        </div>
                        <div className='username-email'>
                            <div className='edit-user-input'>
                                <label>Username*</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                                {errors.username && <span className="error">{errors.username}</span>}
                            </div>
                            <div className='edit-user-input'>
                                <label>Email*</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {errors.email && <span className="error">{errors.email}</span>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='edit-employee-buttons'>
                    <button
                        className='btn-submit-edit-employee'
                        disabled={isButtonDisabled}
                    >
                        Edit Employee
                    </button>
                    <button
                        className='btn-cancel-edit-employee'
                        onClick={(e) => {
                            e.preventDefault();
                            closeModal();
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}