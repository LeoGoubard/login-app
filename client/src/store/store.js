import { create } from "zustand";

export const useAuthStore = create((set) => ({
    auth: {
        username: "",
        isLoading: false,
        active: false,
        profilePic: ["https://zupimages.net/up/21/06/3w5i.png", "https://zupimages.net/up/23/19/pdve.png"][Math.floor(Math.random() * 2)]
    },
    setUsername: (name) => set((state) => ({ auth: { ...state.auth, username: name } })),
    setLoader: (isLoading) => set((state) => ({ auth: { ...state.auth, isLoading: isLoading } }))
}))