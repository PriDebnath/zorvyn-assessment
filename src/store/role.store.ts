
import { createStore, create, } from "zustand"
import { persist } from "zustand/middleware"

const roles = ["viewer", "admin"] as const

type Role =  typeof roles[number]

type Store = {
    role: Role;
    setRole: (role: Role)=>void;
}

const store = create<Store>()

const useRoleStore = store(
    persist(
        (set) => ({
            role: "admin",
            setRole:(role: Role)=>set({role: role})
        }),
        {
            name: "role"
        })
)

export {useRoleStore}