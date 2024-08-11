import { create } from 'zustand'
import { AuthUser, getCurrentUser } from 'aws-amplify/auth'
import { CreateUserType } from '../types'
import { useApiStore } from './ApiStore'

interface UserStore {
    createUser(user: CreateUserType): Promise<void>
    currentUser?: AuthUser
    updateUserData(): Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
    createUser: async (user: CreateUserType) => {
        const client = await useApiStore.getState().getClient()
        try {
            await client.models.User.create(user)
        } catch {
            console.error('Failed to create user.')
        }
    },
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