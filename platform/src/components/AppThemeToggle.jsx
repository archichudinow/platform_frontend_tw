
export default function AppThemeToggle() {
    const handleToggle = () => {
        document.documentElement.classList.toggle("dark");

        // Optional: store the theme in localStorage
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    };

    return (
        <button className="flex items-center" onClick={handleToggle} > 
            ⚈
        </button>
    );
}