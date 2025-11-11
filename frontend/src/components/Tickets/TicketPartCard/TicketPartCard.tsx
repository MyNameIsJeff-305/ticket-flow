import { useSelector } from "react-redux";

// import { FaPen, FaTrash } from "react-icons/fa";

// import OpenModalMenuItem from "../../Navigation/OpenModalMenuItem";
// import EditPart from "../../EditPart/EditPart";

import './TicketPartCard.scss';
import { PiImageSquare } from "react-icons/pi";

interface TicketPartCardProps {
    part: any;
    setDeletePartChecker: any;
    ticketAuthor: any;
    setPartsChecker: any;
}

export default function TicketPartCard({ part, setDeletePartChecker, ticketAuthor, setPartsChecker }: TicketPartCardProps) {
    const currentUser = useSelector((state: any) => state.session.user);

    const onModalClose = () => {
        setPartsChecker(true);
        setDeletePartChecker(true);
    }

    return (
        <div className="ticket-part-card">
            <div className="image">
                {part.imageUrl ?
                    // {false ?
                    <img src={part.imageUrl} alt={part.name + " image"} /> :
                    <PiImageSquare className="part-icon" />
                }
            </div>

            <div className="part-info">
                <div className="part-name">{part.name}</div>
                <div className="part-description">{part.description}</div>

                <div className="spacer"></div>

                <div className="part-footer">
                    <div className="part-sku">
                        {part.sku || "N/A"}
                    </div>
                </div>
            </div>
        </div>
    );
}