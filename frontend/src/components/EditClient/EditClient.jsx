import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./EditClient.css";
import { editClientThunk } from "../../store/clients";
import { getAllClientsThunk } from "../../store/clients";

export default function EditClient({ client, setEditClientChecker }) {
    const [companyName, setCompanyName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState("");
    // const [loading, setLoading] = useState(true);
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
                // setLoading(false);
                setCompanyName(client.companyName || "");
                setFirstName(client.firstName || "");
                setLastName(client.lastName || "");
                setEmail(client.email || "");
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
            setProfilePicUrl(client.profilePicUrl || "");
            // setLoading(false);
        }
    }, [clientId, client, dispatch]);

    useEffect(() => {
        // Validate form inputs
        let newErrors = {};
        if (!companyName && !firstName && !lastName) newErrors.name = "Please enter a name";
        if (!email) newErrors.email = "Please enter an email";

        setErrors(newErrors);
        setIsButtonDisabled(Object.keys(newErrors).length > 0);
    }, [companyName, firstName, lastName, email]);

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
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

        // If a file is selected, append it to the FormData
        if (selectedFile) {
            formData.append("image", selectedFile); // 'image' is the key in multer
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
            <h1>Edit Client</h1>
            <form onSubmit={handleOnSubmit}>
                <div className="edit-client-form">
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
                        <>
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
                        </>
                    )}
                    <div className="edit-client-input">
                        <label>Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="edit-client-input">
                        <label>Profile Picture</label>
                        <input
                            type="file"
                            name="profilePicUrl"
                            accept=".jpg, .jpeg, .png"
                            onChange={updateFile}
                        />
                    </div>
                </div>
                <div className="edit-client-buttons">
                    <button type="submit" disabled={isButtonDisabled} style={{width:"100%", padding: "10px"}}>Save</button>
                </div>
            </form>
        </div>
    );
}
