// import { FaPen, FaAddressBook } from "react-icons/fa6";
import { TiContacts, TiEdit } from "react-icons/ti";

import { useEffect } from "react";

import OpenModalMenuItem from "../../../Navigation/OpenModalMenuItem";
import LocationContactInfo from "./LocationContactInfo";
import LocationImagePreview from "./LocationImagePreview";
import EditLocation from "./EditLocation";

import { MdOutlineZoomOutMap } from "react-icons/md";

import "./LocationCard.scss";

export default function LocationCard({ location, setLocationChecker, locationIndex, clientId }) {

    useEffect(() => {
        // This effect runs when setLocationChecker changes, can be used to trigger re-fetching location data if needed
    }, [setLocationChecker]);

    return (
        <div className="location-card">
            <div className="location-card-left">
                <OpenModalMenuItem
                    modalComponent={<LocationImagePreview image={location.profilePicUrl} />}
                    >
                    <MdOutlineZoomOutMap className="magnifier-icon" />
                    <img src={location.profilePicUrl} alt={location.name} />
                </OpenModalMenuItem>
            </div>
            <div className="location-card-right">
                <div className="location-name">
                    <div className="location-name-and-edit-location">
                        <h3>{location.name}</h3>
                        <div className="spacer">
                            <div className="location-contact-info-location">
                                <OpenModalMenuItem
                                    modalComponent={<LocationContactInfo locationId={location.id} contactInfo={{ phoneNumbers: location.phoneNumbers, emails: location.emails }} />}
                                    dismisable={true}
                                >
                                    <TiContacts />
                                </OpenModalMenuItem>
                            </div>
                            <div className="edit-location-button-location">
                                <OpenModalMenuItem
                                    modalComponent={<EditLocation locationIndex={locationIndex} setLocationChecker={setLocationChecker} clientId={clientId} />}
                                    dismisable={false}
                                >
                                    <TiEdit />
                                </OpenModalMenuItem>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="location-address">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                            `${location.addressLine1} ${location.addressLine2 || ""} ${location.city}, ${location.state} ${location.zipcode}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="location-address-link"
                    >
                        {location.addressLine1} {location.addressLine2 && `, ${location.addressLine2}`} {location.city}, {location.state} {location.zipcode}
                    </a>
                </div>
            </div>
        </div>
    );
}