import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { addClientThunk } from "../../../store/clients";
import { tryFormatPhoneNumber, unformatPhoneNumber } from "../../../utils/helperFunctions";

import './AddClient.scss';

export default function AddClient({ setClientsChecker }) {
    const dispatch = useDispatch();

    const [clientType, setClientType] = useState('individual'); // 'company' or 'individual'
    const [companyName, setCompanyName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('/assets/placeholder-image.jpg');
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const { closeModal } = useModal();

    useEffect(() => {
        setClientType('individual');
        setCompanyName('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setProfilePicUrl('/assets/placeholder-image.jpg');
        setErrors({});
        setIsButtonDisabled(true);
        setSelectedFile(null);
    }, []);

    useEffect(() => {
        let newErrors = {};

        if (clientType === 'company') {
            if (!companyName || companyName === '') {
                newErrors.companyName = "Please enter a valid company name";
            }
        } else {
            if (!firstName || firstName === '') {
                newErrors.firstName = "Please enter a valid first name";
            }
            if (!lastName || lastName === '') {
                newErrors.lastName = "Please enter a valid last name";
            }
        }

        if (!email || email === '' || !email.includes('@')) {
            newErrors.email = "Please enter a valid email";
        }

        if (!phoneNumber || phoneNumber === '') {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        if (!profilePicUrl || profilePicUrl === '') {
            newErrors.profilePicUrl = "Please upload a valid profile picture";
        }

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [clientType, companyName, firstName, lastName, email, phoneNumber, profilePicUrl]);

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileURL = URL.createObjectURL(file);
            setProfilePicUrl(fileURL);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const newClient = {
            companyName: clientType === 'company' ? companyName : '',
            firstName: clientType === 'individual' ? firstName : '',
            lastName: clientType === 'individual' ? lastName : '',
            email,
            phone: unformatPhoneNumber(phoneNumber),
            profilePicUrl: selectedFile || profilePicUrl
        };

        return dispatch(addClientThunk(newClient))
            .then(() => {
                setClientsChecker(true);
                closeModal();
            })
    };

    return (
        <div className="add-client-container">
            <div className="add-client-header">
                <h1>Add Client</h1>
            </div>
            <form className="add-client-form" onSubmit={handleSubmit}>
                <div className="add-client-left">
                    <div className="image-wrapper" onClick={() => document.getElementById('hiddenAddFileInput').click()}>
                        <img
                            src={profilePicUrl}
                            alt="client-avatar"
                            className="client-image"
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
                <div className="add-client-right">
                    <div className="add-client-type">
                        <label>Client Type:</label>
                        <label>
                            <input
                                type="radio"
                                value="individual"
                                checked={clientType === 'individual'}
                                onChange={() => setClientType('individual')}
                            />
                            Individual
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="company"
                                checked={clientType === 'company'}
                                onChange={() => setClientType('company')}
                            />
                            Company
                        </label>
                    </div>

                    {
                        clientType === 'company' ? (
                            <div className="add-client-input">
                                <label>Company Name*</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                                {errors.companyName && <span className="error">{errors.companyName}</span>}
                            </div>
                        ) : (
                            <div className="client-name-inputs">
                                <div className="add-client-input">
                                    <label>First Name*</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                                </div>
                                <div className="add-client-input">
                                    <label>Last Name*</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                                </div>
                            </div>
                        )
                    }
                    <div className="client-contact-inputs" >
                        <div className="add-client-input">
                            <label>Email*</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="add-client-input">
                            <label>Phone Number*</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                maxLength={14}
                                value={tryFormatPhoneNumber(phoneNumber)}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                        </div>
                    </div>
                </div>
                <div className="add-client-buttons">
                    <button
                        className="btn-submit-add-client"
                        disabled={isButtonDisabled}
                    >
                        Create Client
                    </button>
                    <button
                        className="btn-cancel-add-client"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div >
    );
}
