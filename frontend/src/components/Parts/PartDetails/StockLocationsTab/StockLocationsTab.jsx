import StockLocationCard from "./StockLocationCard";

import "./StockLocationsTab.scss";

export default function StockLocationsTab({ stockLocations }) {

    if (!stockLocations)
        return (
            <section className="stock-locations-tab">
                <span className="loader"></span>
            </section>
        );

    return (
        <div className="stock-locations-wrapper">
            {stockLocations.length === 0 ? (
                <div className="no-stock-locations-wrapper">
                    No stock locations available.
                </div>
            ) : (
                stockLocations.map((location) => (
                    <div key={location.id}>
                        <StockLocationCard location={location} />
                    </div>
                ))
            )}
        </div>
    );
}