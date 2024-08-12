import { create } from 'zustand'
import { getCurrentUser } from 'aws-amplify/auth'
import { CreateUserType, UserType } from '../types'
import { useApiStore } from './ApiStore'

interface UserStore {
    createUser(user: CreateUserType): Promise<void>
    currentUser?: UserType
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
        const client = await useApiStore.getState().getClient()

        try {
            const awsUser = await getCurrentUser()
            if (awsUser) {
                const { data: currentUser } = await client.models.User.get({ id: awsUser.userId })
                if (currentUser) {
                    set({ currentUser })
                    return
                }
            }

            throw ''
        } catch {
            console.error('Failed to get currentUser')
        }
    }
}))