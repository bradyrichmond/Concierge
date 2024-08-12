import { create } from 'zustand'
import { LocalConfig } from '../types'
import { useUserStore } from './UserStore'
import { useOrgStore } from './OrgStore'

interface BaseStore {
    doInitialLoad(): Promise<void>
    isLoaded: boolean
    localConfig?: LocalConfig
    setLocalConfig(config: LocalConfig): void
    updateLocalConfig(): void
}

export const useBaseStore = create<BaseStore>((set, get) => ({
    doInitialLoad: async () => {
        get().updateLocalConfig()
        try {
            await useUserStore.getState().updateUserData()
            await useOrgStore.getState().updateOrgData()
            set({ isLoaded: true })
        } catch {
            set({ isLoaded: true })
        }

    },
    isLoaded: false,
    localConfig: undefined,
    setLocalConfig: (config: LocalConfig) => {
        localStorage.setItem('ConciergeConfig', JSON.stringify(config))
    },
    updateLocalConfig: () => {
        const config = localStorage.getItem('ConciergeConfig')

        if (config) {
            set({ localConfig: JSON.parse(config) })
        } else {
            console.error('Application is not configured')
        }
    }
}))