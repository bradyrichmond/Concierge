import { create } from 'zustand'
import { LocalConfig } from '../types'
import { AuthUser } from 'aws-amplify/auth'

interface UseBaseStoreType {
    currentUser?: AuthUser
    localConfig?: LocalConfig
    setLocalConfig(config: LocalConfig): void
    updateLocalConfig(): void
}

export const useStore = create<UseBaseStoreType>((set) => ({
    currentUser: undefined,
    localConfig: undefined,
    setLocalConfig: (config: LocalConfig) => {
        localStorage.setItem('ConciergeConfig', JSON.stringify(config))
    },
    updateLocalConfig: () => {
        const config = localStorage.getItem('ConciergeConfig')

        if (config) {
            set({ localConfig: JSON.parse(config) })
        } else {
            throw 'Application is not configured'
        }
    }
}))