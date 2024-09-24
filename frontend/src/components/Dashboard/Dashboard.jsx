import MyWork from "../MyWork";
import Statistics from "../Statistics/Statistics";

import './Dashboard.css';

export default function Dashboard() {
    return (
        <main className="dashboard">
            <div className="left-section-d">
                <MyWork />
            </div>
            <section className="right-section-d">
                <Statistics />
            </section>
        </main>
    )
}