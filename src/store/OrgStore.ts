import { create } from 'zustand'
import { useUserStore } from './UserStore'
import { useApiStore } from './ApiStore'
import { CreateOrganizationType, LocationType, OrganizationType } from '../types'
import { useBaseStore } from './BaseStore'

interface OrgStore {
    createLocation(name: string): Promise<LocationType>
    createOrganization(org: CreateOrganizationType): Promise<OrganizationType>
    orgId?: string
    orgName?: string
    updateOrgData(): Promise<void>
}

export const useOrgStore = create<OrgStore>((set, get) => ({
    createLocation: async (name: string) => {
        const client = await useApiStore.getState().getClient()
        const setLocalConfig = useBaseStore.getState().setLocalConfig

        const orgId = get().orgId

        if (orgId) {
            const { data: locationData } = await client.models.Location.create({ name, orgId, allowAccessTo: [] })
            if (locationData) {
                setLocalConfig({ orgId, locationId: locationData.id })
                return locationData
            }
        }

        throw 'Failed to create location'
    },
    createOrganization: async (org: CreateOrganizationType) => {
        const client = await useApiStore.getState().getClient()

        try {
            const { data: organization } = await client.models.Organization.create(org)

            if (!organization) {
                throw ''
            }
            
            const setLocalConfig = useBaseStore.getState().setLocalConfig
            const orgId = organization.id
            setLocalConfig({ orgId, locationId: undefined })
            set({ orgId })

            return organization
        } catch (e) {
            console.error('Failed to create Organization')
            console.log(`Error: ${e as unknown as string}`)
            throw 'Failed to create Organization'
        }
    },
    orgId: undefined,
    orgName: undefined,
    updateOrgData: async () => {
        const currentUser = useUserStore.getState().currentUser
        const client = await useApiStore.getState().getClient()
        const localConfig = useBaseStore.getState().localConfig
        const orgId = currentUser ? currentUser.orgId : localConfig?.orgId

        if (orgId) {
            const { data: organization } = await client.models.Organization.get({ id: orgId })

            if (organization) {
                set({ orgId: organization?.id, orgName: organization.name })
            }
        }
    }
}))