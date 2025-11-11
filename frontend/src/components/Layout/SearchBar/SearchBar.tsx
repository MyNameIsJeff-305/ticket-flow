import "./SearchBar.scss";
import { LuSearch } from "react-icons/lu";

export default function SearchBar() {
    return (
        <div className="search-bar">
            <LuSearch className="search-icon" />

            <input type="text" className="search-input" placeholder="Search..." />
        </div>
    );
}