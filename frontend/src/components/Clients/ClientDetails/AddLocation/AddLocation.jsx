import { addLocationToAClientThunk } from "../../../../store/clients";
import { useModal } from '../../../../context/Modal';

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { STATES } from "../../../../utils/constants";

import './AddLocation.scss';

export default function AddLocation({ setLocationAddedChecker, clientId }) {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [profilePicUrl, setProfilePicUrl] = useState('https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);


    const { closeModal } = useModal();

    useEffect(() => {
        setDisabled(Object.keys(errors).length > 0);
    }, [errors]);

    useEffect(() => {
        let newErrors = {};

        if (!name || name === '') {
            newErrors.name = "Please enter a valid location name";
        }

        if (!addressLine1 || addressLine1 === '') {
            newErrors.addressLine1 = "Please enter a valid address line 1";
        }

        if (!city || city === '') {
            newErrors.city = "Please enter a valid city";
        }

        if (!state || state === '') {
            newErrors.state = "Please enter a valid state";
        }

        if (!zipcode || zipcode === '' || !/^\d{5}(-\d{4})?$/.test(zipcode)) {
            newErrors.zipcode = "Please enter a valid zipcode";
        }

        setErrors(newErrors);
    }, [name, addressLine1, city, state, zipcode]);

    const updateFile = e => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const fileURL = URL.createObjectURL(file);
            setProfilePicUrl(fileURL);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to submit the new location to the backend would go here
        // After successful submission, you might want to call setLocationAddedChecker(true);
        const newLocation = {
            name,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode,
            profilePicUrl: selectedFile || profilePicUrl
        };

        return dispatch(addLocationToAClientThunk(clientId, newLocation))
            .then(() => {
                setLocationAddedChecker(true);
                closeModal();
            })
    }

    return (
        <div className="add-location-form">
            <h2>Add New Location</h2>
            <div className="form-group">
                <form onSubmit={handleSubmit}>
                    <div className="form-content">
                        <div className="add-location-left">
                            <div
                                className="image-wrapper"
                                onClick={() => document.getElementById('hiddenLocationFileInput').click()}
                            >
                                <img
                                    src={profilePicUrl}
                                    alt="Location Placeholder"
                                    className="location-image"
                                />
                                <div className="image-overlay">
                                    {profilePicUrl.includes('placeholder') ? 'Click to upload' : 'Click to change'}
                                </div>
                            </div>

                            <input
                                id="hiddenLocationFileInput"
                                type="file"
                                name="img_url"
                                accept="image/*"
                                capture="environment"
                                onChange={updateFile}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="add-location-right">
                            <div className="add-location-input">
                                <label>Location Name*</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Location Name"
                                />
                                {errors.name && <div className="error-message">{errors.name}</div>}
                            </div>
                            <div className="address-lines">
                                <div className="add-location-input">
                                    <label>Address Line 1*</label>
                                    <input
                                        type="text"
                                        value={addressLine1}
                                        onChange={(e) => setAddressLine1(e.target.value)}
                                        required
                                        placeholder="Address Line 1"
                                    />
                                    {errors.addressLine1 && <div className="error-message">{errors.addressLine1}</div>}
                                </div>
                                <div className="add-location-input">
                                    <label>Address Line 2</label>
                                    <input
                                        type="text"
                                        value={addressLine2}
                                        onChange={(e) => setAddressLine2(e.target.value)}
                                        placeholder="(Optional)"
                                    />
                                </div>
                            </div>
                            <div className="city-state-zip">
                                <div className="add-location-input">
                                    <label>City*</label>
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        required
                                        placeholder="City"
                                    />
                                    {errors.city && <div className="error-message">{errors.city}</div>}
                                </div>
                                <div className="add-location-input">
                                    <label>State*</label>
                                    <select
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        required
                                    >
                                        {STATES.map((state) => (
                                            <option key={state.abbreviation} value={state.abbreviation}>
                                                {state.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* {errors.state && <div className="error-message">{errors.state}</div>} */}
                                </div>
                                <div className="add-location-input">
                                    <label>Zipcode*</label>
                                    <input
                                        type="text"
                                        placeholder="12345 or 12345-6789"
                                        value={zipcode}
                                        onChange={(e) => setZipcode(e.target.value)}
                                        required
                                    />
                                    {errors.zipcode && <div className="error-message">{errors.zipcode}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-buttons">
                        <button
                            className="submit-button"
                            disabled={disabled}
                        >
                            Add Location
                        </button>
                        <button
                            className="cancel-button"
                            onClick={() => { setLocationAddedChecker(false); closeModal(); }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}