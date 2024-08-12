import { create } from 'zustand'
import { ContactTypeType } from '../types'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'

interface SettingsStore {
    createContactType(label: string): Promise<void>
    deleteContactType(id: string): Promise<void>
    contactTypes: ContactTypeType[]
    updateContactTypes(): Promise<void>
}

export const useSettingsStore = create<SettingsStore>((set) => ({
    createContactType: async (label: string) => {
        const client = await useApiStore.getState().getClient()
        
        const orgId = useOrgStore.getState().orgId
        if (orgId) {
            await client.models.ContactType.create({ orgId, label, allowAccessTo: [] })
        }
    },
    deleteContactType: async (id: string) => {
        const client = await useApiStore.getState().getClient()
        await client.models.ContactType.delete({ id })
    },
    contactTypes: [],
    updateContactTypes: async () => {
        const client = await useApiStore.getState().getClient()
        const { data: contactTypes } = await client.models.ContactType.list()
        set({ contactTypes })
    }
}))