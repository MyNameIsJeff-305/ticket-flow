import { csrfFetch } from "../../store/csrf";

import './Calls.scss';

export default function Calls() {
    const fetchCalls = async () => {
        const res = await csrfFetch('/api/integrations/twilio/outgoingCalls');
    };

    return (
        <section className="calls-tab">
            <div className="calls-tab-header">
                <h1>Calls</h1>
            </div>

            <div className="calls-container">
                <button onClick={fetchCalls}>GET calls</button>
            </div>
        </section>
    );
}