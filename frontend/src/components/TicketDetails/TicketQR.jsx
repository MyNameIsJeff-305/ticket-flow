import QRCode from 'react-qr-code';
import { FaShare } from "react-icons/fa";

import './TicketDetails.css';

export default function TicketQR({ ticketHashedId }) {
    const trackingUrl = `${window.location.origin}/track/${ticketHashedId}`;

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Track your Ticket',
                    text: 'Check the status of your ticket here:',
                    url: trackingUrl,
                });
                console.log('Ticket link shared successfully!');
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Share not supported on this browser');
        }
    };

    return (
        <div className="ticket-qr">
            <div className='qr'>
                <QRCode value={trackingUrl} size={200} />
            </div>
            <button onClick={handleShare}><FaShare /> Share</button>
        </div>
    )
}