
import { createStore, create, } from "zustand"
import { persist } from "zustand/middleware"

export const themes = ["dark", "light"] as const
const root = document

type Theme = typeof themes[number]

type Store = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const store = create<Store>()

export const useThemeStore = store(
    persist(
        (set) => ({
            theme: "light",
            setTheme: (theme: Theme) => {
                set({ theme: theme })
                if (theme == "dark") {
                    root.body.classList.add("dark")
                } else {
                    root.body.classList.remove("dark")
                }
            }
        }),
        {
            name: "theme"
        })
)
