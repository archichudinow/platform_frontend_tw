import AppThemeToggle from "./AppThemeToggle";
import { Link } from "react-router-dom";

export default function AppNavBar() {
    return (
        <div className="flex justify-between px-4 py-10">
            <h2>Neko Mori</h2>
            <nav className="flex gap-3">
                <Link to="/">Quests</Link>
                <Link to="/collection">Collection</Link>
                <AppThemeToggle />
            </nav>
        </div>
    );
}