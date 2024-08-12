import { create } from 'zustand'
import { ClientDataInput, ClientType } from '../types'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface ClientStore {
    clients: ClientType[]
    createClient(clientInput: ClientDataInput): Promise<ClientType>
    lookupClientByPhone(phone: string): Promise<ClientType>
    updateClients(): Promise<void>
}

export const useClientStore = create<ClientStore>((set) => ({
    clients: [],
    createClient: async (clientInput: ClientDataInput) => {
        const client = await useApiStore.getState().getClient()
        const orgId = useOrgStore.getState().orgId

        if (orgId) {
            const { data: clientData } = await client.models.Client.create({ firstName: clientInput.firstName, lastName: clientInput.lastName, phone: clientInput.phone, orgId })
            
            if (clientData) {
                return clientData
            }
        }

        throw 'Failed to create client'
    },
    lookupClientByPhone: async (phone: string) => {
        const client = await useApiStore.getState().getClient()
        const { data: clientData } = await client.models.Client.listClientByPhone({ phone })

        if (clientData && clientData.length > 0) {
            return clientData[0]
        }

        throw 'Client does not exist'
    },
    updateClients: async () => {
        const orgId = useOrgStore.getState().orgId
        
        if (orgId) {
            const client = await useApiStore.getState().getClient()
            const { data: clients } = await client.models.Client.listClientByOrgId({ orgId })
            if (clients) {
                set({ clients })
                return
            }
        }

        throw 'Failed to update clients'
    }
}))