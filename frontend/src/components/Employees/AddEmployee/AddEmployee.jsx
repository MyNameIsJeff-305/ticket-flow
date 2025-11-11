import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUserThunk } from '../../../store/session';
import { useModal } from '../../../context/Modal';

import './AddEmployee.scss';

export default function AddEmployee({ setEmployeesAddChecker }) {
    const dispatch = useDispatch();
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('/assets/placeholder-image.jpg');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    
    const { closeModal } = useModal();

    useEffect(() => {
        setFirstName('');
        setLastName('');
        setProfilePicUrl('/assets/placeholder-image.jpg');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setErrors({});
        setIsButtonDisabled(true);
        setSelectedFile(null);
    }, []);

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
        if(username.length < 4){
            newErrors.username = "Username must be at least 4 characters long";
        }
        if(username.length > 30){
            newErrors.username = "Username cannot be longer than 30 characters";
        }
        if (!email || email === '' || !email.includes('@')) {
            newErrors.email = "Please enter a valid email";
        }
        if(email.length < 3){
            newErrors.email = "Email must be at least 3 characters long";
        }
        if(email.length > 256){
            newErrors.email = "Email cannot be longer than 256 characters";
        }
        if (!password || password === '') {
            newErrors.password = "Please enter a valid password";
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if(password.length < 6){
            newErrors.password = "Password must be at least 6 characters long";
        }
        if(password.length > 50){
            newErrors.password = "Password cannot be longer than 50 characters";
        }
        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [firstName, lastName, username, email, password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        const newUser = {
            firstName,
            lastName,
            username,
            email,
            password,
            profilePicUrl: selectedFile || profilePicUrl
        };

        const data = await dispatch(addUserThunk(newUser));
        if (data && data.errors) {
            setErrors(data.errors);
        } else {
            setEmployeesAddChecker(true);
            closeModal();
        }
    };

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileURL = URL.createObjectURL(file);
            setProfilePicUrl(fileURL);
        }
    };

    return (
        <div className='add-user-container'>
            <div className='add-user-header'>
                <h1>Add Employee</h1>
            </div>
            <form className='add-user-form' onSubmit={handleSubmit}>
                <div className='add-user-left'>
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
                    {errors.profilePicUrl && <span className="error">{errors.profilePicUrl}</span>}
                </div>
                <div className='add-user-right'>
                    <div className='first-last-name'>
                        <div className='add-user-input'>
                            <label>First Name*</label>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div className='add-user-input'>
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
                        <div className='add-user-input'>
                            <label>Username*</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            {errors.username && <span className="error">{errors.username}</span>}
                        </div>
                        <div className='add-user-input'>
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
                    <div className='password-confirm'>
                        <div className='add-user-input'>
                            <label>Password*</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>
                        <div className='add-user-input'>
                            <label>Confirm Password*</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                        </div>
                    </div>
                </div>
                <div className='add-employee-buttons'>
                    <button
                        className='btn-submit-add-employee'
                        disabled={isButtonDisabled}
                    >
                        Add Employee
                    </button>
                    <button
                        className='btn-cancel-add-employee'
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
    );
}