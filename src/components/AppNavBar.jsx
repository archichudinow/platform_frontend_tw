import AppThemeToggle from "./AppThemeToggle";
import { Link } from "react-router-dom";

export default function AppNavBar() {
    return (
        <div className="flex justify-between px-4 py-10">
            <h2 className="font-extralight tracking-widest text-primary">Neko Mori</h2>
            <nav className="flex gap-3">
                <Link className="font-extralight tracking-widest text-primary" to="/">Quests</Link>
                <Link className="font-extralight tracking-widest text-primary" to="/collection">Collection</Link>
                <AppThemeToggle />
            </nav>
        </div>
    );
}