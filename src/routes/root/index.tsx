import { Box } from '@mui/material'
import { useUserStore } from '../../store/UserStore'
import { useBaseStore } from '../../store/BaseStore'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

const Root = () => {
    const currentUser = useUserStore().currentUser
    const isLoaded = useBaseStore().isLoaded
    const localConfig = useBaseStore().localConfig
    const navigate = useNavigate()

    useEffect(() => {
        console.log(`check local data etc: isLoaded: ${isLoaded}, user: ${JSON.stringify(currentUser)}, config: ${JSON.stringify(localConfig)}`)
        if (isLoaded && !currentUser && localConfig) {
            navigate('/loaded-no-user')
        }

        if (isLoaded && !currentUser && !localConfig) {
            navigate('/loaded-no-config')
        }
    }, [currentUser, isLoaded, localConfig, navigate])

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Outlet />
        </Box>
    )
}

export default Root