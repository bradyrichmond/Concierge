import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { useBaseStore } from './BaseStore'

interface ContactStore {
    createContact(contactType: string, clientId: string): Promise<void>
    contacts: LocalContactType[]
    subscribeToContacts(): Promise<void>
}

export interface LocalContactType {
    id: string
    orgId: string
    location: { 
        id: string
    }
    client: {
        id: string
        firstName: string
        lastName: string
        phone: string
    }
    oversizedItems?: boolean | null
    oversizedItemsDescription?: string | null
}

export const useContactStore = create<ContactStore>((set) => ({
    createContact: async (contactType: string, clientId: string) => {
        const client = await useApiStore.getState().getClient()
        const orgId = useOrgStore.getState().orgId
        const localConfig = useBaseStore.getState().localConfig

        if (!orgId || !localConfig?.locationId) {
            throw ''
        }

        await client.models.Contact.create({ orgId, typeId: contactType, allowAccessTo: [], isWaiting: true, clientId, locationId: localConfig.locationId })
    },
    contacts: [],
    subscribeToContacts: async () => {
        const client = await useApiStore.getState().getClient()
        const localConfig = useBaseStore.getState().localConfig

        if (localConfig?.locationId) {
            client.models.Contact.observeQuery({
                filter: {
                    locationId: {
                        eq: localConfig.locationId
                    },
                    isWaiting: { eq: true }
                },
                selectionSet: [
                    'id',
                    'orgId',
                    'location.id',
                    'client.id',
                    'client.firstName',
                    'client.lastName',
                    'client.phone',
                    'oversizedItems',
                    'oversizedItemsDescription'
                ]
            }).subscribe({
                next: ({ items }) => {
                    set({ contacts: items })
                }
            })
        }
    }
}))