import { create } from 'zustand'

export const useChatStore = create((set) => {
  return {
    user: {},
    setUser: (d) => set({ user: d }),
  }
})

window.z = useChatStore
