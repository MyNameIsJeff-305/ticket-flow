import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LocationCard from "./LocationCard";

import { getOneClientThunk } from "../../../store/clients";

import { MdOutlineAddLocationAlt } from "react-icons/md";
import { FaPhone, FaEnvelope } from "react-icons/fa6";

import { formatPhoneNumber } from "../../../utils/helperFunctions";

import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
import AddLocation from "./AddLocation";

import './ClientDetails.scss';
import ClientTickets from "./ClientTickets/ClientTickets";

export default function ClientDetails() {
    const dispatch = useDispatch();

    const { clientId } = useParams();

    const client = useSelector(state => state.clients.client)

    const [locationAddedChecker, setLocationAddedChecker] = useState(false);
    const [locationChecker, setLocationChecker] = useState(false);

    useEffect(() => {
        dispatch(getOneClientThunk(clientId));
    }, [dispatch, clientId, locationAddedChecker, locationChecker]);

    return (
        <div className="client-details">
            {client ? (
                <>
                    <div className="client-wrapper">
                        <div className="client-details-header">
                            <div className="client-title-and-edit">
                                <div className="client-title">
                                    <div className="title-and-company-section">
                                        <div className="client-image">
                                            {client.profilePicUrl ? (
                                                <img src={client.profilePicUrl} alt="Client Profile" />
                                            ) : (
                                                <div className="placeholder-image">
                                                    <span>{client.firstName ? client.firstName.charAt(0).toUpperCase() : ''}{client.lastName ? client.lastName.charAt(0).toUpperCase() : ''}</span>
                                                </div>
                                            )}
                                        </div>
                                        {client.companyName ? (
                                            <div className="title-and-company">
                                                <h1>{client.companyName}</h1>
                                                <div className="company-tag">
                                                    COMPANY
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="title-and-company">
                                                <h1>{client.firstName} {client.lastName}</h1>
                                                <div className="individual-tag">
                                                    INDIVIDUAL
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="client-contact-info-header">
                                <h2>Contact Information</h2>
                                {client.phone && (
                                    <div className="phone-number" onClick={() => {
                                        window.location.href = `tel:${client.phone}`;
                                    }}>
                                        <div className="phone-button" >
                                            <FaPhone />
                                        </div>
                                        {formatPhoneNumber(client.phone)}
                                    </div>
                                )}
                                {client.email && (
                                    <div className="email-address" onClick={() => {
                                        window.location.href = `mailto:${client.email}`;
                                    }}>
                                        <div className="email-button">
                                            <FaEnvelope />
                                        </div>
                                        {client.email || "No email provided"}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="client-details-body">
                            <div className="locations-section">
                                <div className="locations-header">
                                    <h2>Locations</h2>
                                    {/* TODO: ADD Horizontal Scroller to Locations */}
                                    <OpenModalMenuItem
                                        modalComponent={<AddLocation setLocationAddedChecker={setLocationAddedChecker} clientId={client.id} />}
                                        onModalClose={() => setLocationAddedChecker(true)}
                                        dismisable={false}
                                    >
                                        <div className="add-location-button">
                                            <MdOutlineAddLocationAlt />
                                            <div>
                                                Add Location
                                            </div>
                                        </div>
                                    </OpenModalMenuItem>
                                </div>
                                <div className="locations-list">
                                    {client.locations && client.locations.length > 0 ? (
                                        client.locations.map((location, index) => (
                                            <LocationCard key={location.id} clientId={client.id} locationIndex={index} location={location} setLocationChecker={setLocationChecker} />
                                        ))
                                    ) : (
                                        <p>No locations available for this client.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="client-tickets-section">
                        <ClientTickets tickets={client.tickets} clientId={client.id} />
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}