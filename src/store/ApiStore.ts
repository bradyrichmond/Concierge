import { Client, generateClient } from 'aws-amplify/api'
import { create } from 'zustand'
import { Schema } from '../../amplify/data/resource'
import { fetchAuthSession } from 'aws-amplify/auth'

interface ApiStore {
    getClient(): Promise<Client<Schema>>
}

export const useApiStore = create<ApiStore>(() => ({
    getClient: async () => {
        const session = await fetchAuthSession()
        const tokens = session.tokens
        const accessToken = tokens?.accessToken

        if (accessToken) {
            const newClient = generateClient<Schema>({
                authMode: 'userPool'
            })

            if (newClient) {
                return newClient
            }
        }

        throw 'Failed to generate client api'
    }
}))