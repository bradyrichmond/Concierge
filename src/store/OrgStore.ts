import { create } from 'zustand'
import { useUserStore } from './UserStore'
import { useApiStore } from './ApiStore'
import { CreateOrganizationType, OrganizationType } from '../types'
import { useBaseStore } from './BaseStore'

interface OrgStore {
    createOrganization(org: CreateOrganizationType): Promise<OrganizationType>
    orgId?: string
    orgName?: string
    updateOrgData(): Promise<void>
}

export const useOrgStore = create<OrgStore>((set) => ({
    createOrganization: async (org: CreateOrganizationType) => {
        const client = await useApiStore.getState().getClient()

        try {
            const { data: organization } = await client.models.Organization.create(org)
            
            if (!organization) {
                throw ''
            }

            return organization
        } catch (e) {
            console.error('Failed to create Organization')
            console.log(`Error: ${e as unknown as string}`)
            throw ''
        }
    },
    orgId: undefined,
    orgName: undefined,
    updateOrgData: async () => {
        const currentUser = useUserStore.getState().currentUser
        const client = await useApiStore.getState().getClient()
        const localConfig = useBaseStore.getState().localConfig
        let orgId

        if (localConfig) {
            orgId = localConfig.orgId
        }

        if (currentUser && !localConfig) {
            const { data: user } = await client.models.User.get({ id: currentUser.userId })
            orgId = user?.orgId
        }

        if (orgId) {
            const { data: organization } = await client.models.Organization.get({ id: orgId })

            if (organization) {
                set({ orgId: organization?.id, orgName: organization.name })
            }
        }
    }
}))