import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants";

const currentTheme = "luxury"

const ThemeSelector: React.FC = () => {
    return (
        <>
            <div className="dropdown dropdoen-end">
                {/* Trigger */}
                <button className="btn btn-ghost btn-circle" tabIndex={0}>
                    <PaletteIcon className="size-5" />
                </button>

                <div tabIndex={0} className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10">
                    {THEMES.map(theme => (
                        <button key={theme.name} className={` w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${currentTheme == theme.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}`}>
                            <PaletteIcon className="size-4" />

                            <span className="text-sm font-medium">{theme.label}</span>

                            {/* Preview colors */}
                            <div className="ml-auto flex gap-1">
                                {theme.colors.map((color, index) => (<span key={index} className="size-2 rounded-full" style={{backgroundColor: color}}></span>))}
                            </div>

                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ThemeSelector;