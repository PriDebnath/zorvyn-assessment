
import { createStore, create, } from "zustand"
import { persist } from "zustand/middleware"

export const themes = ["dark", "light"] as const

type Theme =  typeof themes[number]

type Store = {
    theme: Theme;
    setTheme: (theme: Theme)=>void;
}

const store = create<Store>()

export const useThemeStore = store(
    persist(
        (set) => ({
            theme: "light",
            setTheme:(theme: Theme)=>set({theme: theme})
        }),
        {
            name: "theme"
        })
)
