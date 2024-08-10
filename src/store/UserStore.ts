import { create } from 'zustand'
import { AuthUser, getCurrentUser } from 'aws-amplify/auth'

interface UserStore {
    currentUser?: AuthUser
    updateUserData(): Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
    currentUser: undefined,
    updateUserData: async () => {
        try {
            const currentUser = await getCurrentUser()
            if (currentUser) {
                set({ currentUser })
                return
            }

            throw ''
        } catch {
            console.error('Failed to get currentUser')
        }
    }
}))