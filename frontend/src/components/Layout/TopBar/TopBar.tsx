import "./TopBar.scss";
import SearchBar from "../SearchBar/SearchBar";
import ProfileControl from "../ProfileControl";

import ThemeSwitch from "../../IconThemeSwitch";

export default function TopBar() {
    return (
        <div className="top-bar">
            <div className="search-bar-wrapper">
                
            </div>

            <div className="spacer"></div>

            <ThemeSwitch />

            <ProfileControl />
        </div>
    );
}
