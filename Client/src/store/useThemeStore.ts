import {create} from "zustand"

export const useThemeStore = create<{theme: string, setTheme: (themeName: string) => any}>((set) => ({
    theme: localStorage.getItem("ProductStoreThem") || "luxury",
    setTheme:  (themeName: string) => {
        localStorage.setItem("ProductStoreThem", themeName)
        set({theme: themeName}
        )}
}))