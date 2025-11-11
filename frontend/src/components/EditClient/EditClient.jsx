import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { editClientThunk } from "../../store/clients";
import { getAllClientsThunk } from "../../store/clients";
import { tryFormatPhoneNumber, unformatPhoneNumber, formatPhoneNumber } from "../../utils/helperFunctions";

import "./EditClient.scss";

export default function EditClient({ client, setEditClientChecker }) {
    const [companyName, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [errors, setErrors] = useState({});
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const { clientId } = useParams();

    useEffect(() => {
        const fetchClient = async () => {
            try {
                await dispatch(getAllClientsThunk());
            } finally {
                setCompanyName(client.companyName || "");
                setFirstName(client.firstName || "");
                setLastName(client.lastName || "");
                setEmail(client.email || "");
                setPhoneNumber((client.phone) || "");
                setProfilePicUrl(client.profilePicUrl || "");
            }
        };

        if (!client || client.id !== parseInt(clientId)) {
            fetchClient();
        } else {
            setCompanyName(client.companyName || "");
            setFirstName(client.firstName || "");
            setLastName(client.lastName || "");
            setEmail(client.email || "");
            setPhoneNumber(tryFormatPhoneNumber(client.phone) || "");
            setProfilePicUrl(client.profilePicUrl || "");
        }
    }, [clientId, client, dispatch]);

    useEffect(() => {
        let newErrors = {};
        if (!companyName && !firstName && !lastName) newErrors.name = "Please enter a name";
        if (!email) newErrors.email = "Please enter an email";

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [companyName, firstName, lastName, email, phoneNumber]);

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileURL = URL.createObjectURL(file);
            setProfilePicUrl(fileURL);
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData();
        formData.append("companyName", companyName);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("phone", unformatPhoneNumber(phoneNumber));

        if (selectedFile) {
            formData.append("image", selectedFile);
        } else {
            formData.append("profilePicUrl", profilePicUrl);
        }

        return dispatch(editClientThunk(client.id, formData))
            .then(() => {
                setEditClientChecker(true);
                closeModal();
            });
    };

    return (
        <div className="edit-client-container">
            <div className="edit-client-header">
                <h1>Edit Client</h1>
            </div>
            <form onSubmit={handleOnSubmit} className="edit-client-form">
                <div className="edit-client-left">
                    <div className="image-wrapper" onClick={() => document.getElementById('hiddenFileInput').click()}>
                        <img
                            src={profilePicUrl}
                            alt="client-avatar"
                            className="client-image"
                        />
                        <div className="image-overlay">Click to change</div>
                    </div>
                    <input
                        id="hiddenFileInput"
                        type="file"
                        name="img_url"
                        capture="environment"
                        accept=".jpg, .jpeg, .png"
                        onChange={updateFile}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="edit-client-right">
                    <div className="edit-client-type">
                        <label>Client Type:</label>
                        <label>
                            <input
                                type="radio"
                                value="individual"
                                checked={client.firstName !== "" || client.lastName !== ""}
                                disabled={true}
                            />
                            Individual
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="company"
                                checked={client.companyName !== ""}
                                disabled={true}
                            />
                            Company
                        </label>
                    </div>
                    {client.companyName !== '' ? (
                        <div className="edit-client-input">
                            <label>Company Name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            {errors.name && <div className="edit-client-errors">{errors.name}</div>}
                        </div>

                    ) : (
                        <div className="client-contact-inputs">
                            <div className="edit-client-input">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="edit-client-input">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            {errors.name && <div className="edit-client-errors">{errors.name}</div>}
                        </div>
                    )}
                    <div className="client-contact-inputs">
                        <div className="edit-client-input">
                            <label>Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="edit-client-input">
                            <label>Phone Number*</label>
                            <input
                                type="text"
                                name="phoneNumber"
                                maxLength={14}
                                value={formatPhoneNumber(phoneNumber)}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                        </div>
                    </div>
                </div>
                <div className="edit-client-buttons">
                    <button className="btn-submit-edit-client" disabled={isButtonDisabled}>Save</button>
                    <button className="btn-cancel-edit-client" type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
