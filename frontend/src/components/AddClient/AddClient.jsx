import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './AddClient.css';
import { addClientThunk } from "../../store/clients";

export default function AddClient({ setClientsChecker }) {
    const dispatch = useDispatch();

    const [clientType, setClientType] = useState('individual'); // 'company' or 'individual'
    const [companyName, setCompanyName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [profilePicUrl, setProfilePicUrl] = useState('');
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const { closeModal } = useModal();

    useEffect(() => {
        setCompanyName('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setProfilePicUrl('');
        setErrors({});
        setIsButtonDisabled(true);
        setSelectedFile(null);
    }, []);

    useEffect(() => {
        let newErrors = {};

        if (clientType === 'company' && (!companyName || companyName.trim() === '')) {
            newErrors.companyName = "Please enter a valid company name";
        }
        if (clientType === 'individual' && (!firstName || firstName.trim() === '')) {
            newErrors.firstName = "Please enter a valid first name";
        }
        if (clientType === 'individual' && (!lastName || lastName.trim() === '')) {
            newErrors.lastName = "Please enter a valid last name";
        }
        if (!email || email.trim() === '') {
            newErrors.email = "Please enter a valid email";
        }
        if (!phoneNumber || phoneNumber.trim() === '') {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [companyName, firstName, lastName, email, phoneNumber, clientType]);

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setProfilePicUrl(file);
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
            phoneNumber,
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
            <form onSubmit={handleSubmit}>
                <div className="add-part-title">Add a Client</div>
                <div className="add-client-input-container">
                    <div className="client-type-radio">
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

                    {clientType === 'company' ? (
                        <div>
                            <label>Company Name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            {errors.companyName && <span>{errors.companyName}</span>}
                        </div>
                    ) : (
                        <>
                            <div>
                                <label>First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <span>{errors.firstName}</span>}
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <span>{errors.lastName}</span>}
                            </div>
                        </>
                    )}

                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <span>{errors.email}</span>}
                    </div>
                    <div>
                        <label>Phone Number</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
                    </div>
                    <div>
                        <label>Profile Picture URL</label>
                        <input
                            type="file"
                            name="profilePicUrl"
                            accept=".jpg, .jpeg, .png"
                            onChange={updateFile}
                        />
                    </div>
                </div>
                <button type="submit" disabled={isButtonDisabled}>Add Client</button>
            </form>
        </div>
    );
}
