import { FaPhone, FaEnvelope } from "react-icons/fa6";
import { MdOutlineAddIcCall } from "react-icons/md";
import { LuMailPlus, LuMapPin } from "react-icons/lu";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashOutline } from "react-icons/io5";

import {
    addPhoneNumberToALocationThunk,
    deletePhoneNumberFromALocationThunk,
    addEmailToALocationThunk,
    deleteEmailFromALocationThunk,
    getLocationThunk
} from "../../../../../store/clients";

import { tryFormatPhoneNumber, formatPhoneNumber, unformatPhoneNumber } from "../../../../../utils/helperFunctions";

import "./LocationContactInfo.scss";

export default function LocationContactInfo({ locationId }) {
    const dispatch = useDispatch();

    const client = useSelector((state) => state.clients.client);
    const locations = client.locations || [];
    const location = locations.find((loc) => loc.id === locationId) || {};

    const phones = location?.phoneNumbers || [];
    const emails = location?.emails || [];

    // UI states
    const [showAddPhone, setShowAddPhone] = useState(false);
    const [showAddEmail, setShowAddEmail] = useState(false);

    useEffect(() => {
        dispatch(getLocationThunk(client.id, locationId));
    }, [dispatch, locationId, client.id]);

    // Form states
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneType, setPhoneType] = useState("");
    const [email, setEmail] = useState("");
    const [emailType, setEmailType] = useState("");

    // Handlers
    const handleAddPhoneNumber = (e) => {
        e.preventDefault();
        if (!phoneNumber || !phoneType) return;

        dispatch(addPhoneNumberToALocationThunk(locationId, { phoneNumber: unformatPhoneNumber(phoneNumber), phoneType }));
        setPhoneNumber("");
        setPhoneType("");
        setShowAddPhone(false);
    };

    const handleDeletePhoneNumber = (phoneId) => {
        dispatch(deletePhoneNumberFromALocationThunk(locationId, phoneId));
    };

    const handleAddEmail = (e) => {
        e.preventDefault();
        if (!email || !emailType) return;

        dispatch(addEmailToALocationThunk(locationId, { email, emailType }));
        setEmail("");
        setEmailType("");
        setShowAddEmail(false);
    };

    const handleDeleteEmail = (emailId) => {
        dispatch(deleteEmailFromALocationThunk(locationId, emailId));
    };

    return (
        <div className="location-contact-info-wrapper">
            <div className="contact-info-header">
                <h1>Contact Information</h1>
                <p><LuMapPin /> {location.name}</p>
            </div>
            <div className="contact-info-details">
                {/* Phone Section */}
                <div className="contact-phone-number-list">
                    <>
                        <h3>Phone Numbers</h3>
                        <div className="phone-number-elements">
                            {phones.length > 0 ? (
                                phones.map((phone) => (
                                    <div key={phone.id} className="phone-number-element">
                                        <div className="phone-section" onClick={() => (window.location.href = `tel:${phone.phoneNumber}`)}>
                                            <div className="phone-button">
                                                <FaPhone />
                                            </div>
                                            <div className="phone-number-and-title">
                                                <span className="phone-type-label">{phone.phoneType}</span>
                                                <span className="phone-number-label">{formatPhoneNumber(phone.phoneNumber)}</span>
                                            </div>
                                        </div>
                                        <button
                                            className="delete-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeletePhoneNumber(phone.id);
                                            }}
                                        >
                                            <IoTrashOutline />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No phone numbers yet.</p>
                            )}
                        </div>
                    </>

                    {!showAddPhone ? (
                        <button className="add-button" onClick={() => setShowAddPhone(true)}>
                            <MdOutlineAddIcCall /> Add Phone
                        </button>
                    ) : (
                        <form className="add-phone-form" onSubmit={handleAddPhoneNumber}>
                            <div className="form-header"><MdOutlineAddIcCall /> Add Phone</div>
                            <div className="input-group">
                                <div className="input-field">
                                    <label>Phone Type *</label>
                                    <input
                                        type="text"
                                        placeholder="Type (e.g., Mobile, Work)"
                                        value={phoneType}
                                        onChange={(e) => setPhoneType(e.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Phone Number *</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Phone Number"
                                        maxLength={14}
                                        value={tryFormatPhoneNumber(phoneNumber)}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit-button-add">Add</button>
                                <button type="cancel-button-add" onClick={() => setShowAddPhone(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Email Section */}
                <div className="contact-email-list">
                    <>
                        <h3>Email Addresses</h3>
                        <div className="email-address-elements">
                            {emails.length > 0 ? (
                                emails.map((emailObj) => (
                                    <div key={emailObj.id} className="email-address-element">
                                        <div className="email-section" onClick={() => (window.location.href = `mailto:${emailObj.email}`)}>
                                            <div className="email-button">
                                                <FaEnvelope />
                                            </div>
                                            <div className="email-address-and-title">
                                                <span className="email-type-label">{emailObj.emailType}</span>
                                                <span className="email-label">{emailObj.email}</span>
                                            </div>
                                        </div>
                                        <button
                                            className="delete-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteEmail(emailObj.id);
                                            }}
                                        >
                                            <IoTrashOutline />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No email addresses yet.</p>
                            )}
                        </div>
                    </>

                    {!showAddEmail ? (
                        <button className="add-button" onClick={() => setShowAddEmail(true)}>
                            <LuMailPlus /> Add Email
                        </button>
                    ) : (
                        <form className="add-email-form" onSubmit={handleAddEmail}>
                            <div className="form-header"><LuMailPlus /> Add Email</div>
                            <div className="input-group">
                                <div className="input-field">
                                    <label>Email Type *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., Work, Personal"
                                        value={emailType}
                                        required={true}
                                        onChange={(e) => setEmailType(e.target.value)}
                                    />
                                </div>
                                <div className="input-field">
                                    <label>Email Address *</label>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        required={true}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="form-actions">
                                <button type="submit-button-add">Add</button>
                                <button type="cancel-button-add" onClick={() => setShowAddEmail(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
