import { create } from 'zustand'

export const useChatStore = create((set) => {
  return {
    userId: '',
    setUserId: (v) => set({ userId: v }),
  }
})

window.z = useChatStore
