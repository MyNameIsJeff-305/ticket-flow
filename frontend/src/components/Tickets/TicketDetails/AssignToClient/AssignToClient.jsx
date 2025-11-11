import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllClientsThunk, getOneClientThunk, getAllLocationsOfAClientThunk, editClientThunk, addPhoneNumberToALocationThunk } from '../../../../store/clients';
import { updateTicketThunk } from '../../../../store/tickets';
import { useModal } from '../../../../context/Modal';
import { formatPhoneNumber } from '../../../../utils/helperFunctions';

import { LuSearch } from "react-icons/lu";

import './AssignToClient.scss';

export default function AssignToClient({ setAssignToClient }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const clients = useSelector(state => state.clients?.allClients);
    const clientLocations = useSelector(state => state.clients.client?.locations);
    const ticket = useSelector(state => state.tickets.ticket);

    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [phoneName, setPhoneName] = useState('');
    const [searchFilter, setSearchFilter] = useState('');

    useEffect(() => {
        dispatch(getAllClientsThunk(null, null, searchFilter));
    }, [dispatch, searchFilter]);

    useEffect(() => {
        if (selectedClient) {
            dispatch(getOneClientThunk(selectedClient));
            dispatch(getAllLocationsOfAClientThunk(selectedClient));
        }
    }, [dispatch, selectedClient]);

    const handleAssignCallToLocation = (locationId) => {
        setSelectedLocation(locationId);
    };

    const handleAssign = async () => {
        if (selectedClient && (!clientLocations || clientLocations.length === 0)) {
            const updatedClient = new FormData();
            updatedClient.append('phone', ticket.CallInfo[0]?.caller || '');
            await dispatch(editClientThunk(selectedClient, updatedClient));
        }

        if (selectedClient && selectedLocation) {
            const newLocationPhoneNumber = {
                phoneNumber: ticket.CallInfo[0]?.caller || '',
                phoneType: phoneName || 'New Contact'
            };
            await dispatch(addPhoneNumberToALocationThunk(selectedLocation, newLocationPhoneNumber));
        }

        const updatedTicket = {
            ...ticket,
            clientId: selectedClient
        };

        await dispatch(updateTicketThunk(ticket.id, updatedTicket));
        setAssignToClient(true);
        closeModal();
    };

    const sortingClients = clients?.sort((a, b) => {
        const nameA = a.companyName ? a.companyName.toLowerCase() : (a.firstName + ' ' + a.lastName).toLowerCase();
        const nameB = b.companyName ? b.companyName.toLowerCase() : (b.firstName + ' ' + b.lastName).toLowerCase();
        return nameA.localeCompare(nameB);
    });

    return (
        <div className="assign-to-client">
            <h1>Assign Ticket to Client</h1>
            <div className="assign-to-client-wrapper">
                <div className="assign-to-client-left">
                    <div className="filter-block">
                        <div className="search-filter-wrapper">
                            <LuSearch className="search-filter-icon" />
                            <input type="text" placeholder="Title, description, etc..." className="search-tickets-filter-input" value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
                        </div>
                    </div>
                    {sortingClients && sortingClients.length > 0 ? (
                        <div className="clients-list">
                            {sortingClients.map(client => (
                                <div
                                    key={client.id}
                                    className={`client-card-selectable ${selectedClient === client.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedClient(client.id)}
                                >
                                    <div className="client-card-info">
                                        <img src={client.profilePicUrl || '/assets/default-profile.png'} alt="profile" />
                                        <div className="client-card-texts">
                                            <h4>{client.companyName || `${client.firstName} ${client.lastName}`}</h4>
                                            {client.companyName && <p>{client.firstName} {client.lastName}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No clients found.</p>
                    )}
                </div>

                <div className="assign-to-client-right">
                    {selectedClient ? (
                        <>
                            <h2>Phone Number Information</h2>
                            <div className="phone-number-information">
                                <input
                                    type="text"
                                    placeholder="Phone label (e.g., Front Desk)"
                                    value={phoneName}
                                    onChange={(e) => setPhoneName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    value={formatPhoneNumber(ticket.CallInfo[0]?.caller) || 'No phone number'}
                                    readOnly
                                />
                            </div>
                            <h3>Select the Location you want to add the phone number to:</h3>
                            {clientLocations && clientLocations.length > 0 ? (
                                <div className="locations-list">
                                    {clientLocations.map(location => (
                                        <div
                                            key={location.id}
                                            className={`location-card-location ${selectedLocation === location.id ? 'selected' : ''}`}
                                            onClick={() => handleAssignCallToLocation(location.id)}
                                        >
                                            <h4>{location.name}</h4>
                                            <p>{location.addressLine1} {location.city}, {location.state} {location.zipCode}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No locations found for this client.</p>
                            )}
                        </>
                    ) : (
                        <p>Please select a client to assign the ticket.</p>
                    )}
                </div>
            </div>
            <button onClick={handleAssign} disabled={!selectedClient || !selectedLocation || !phoneName}>Assign Ticket to Client</button>
        </div>
    );
}
