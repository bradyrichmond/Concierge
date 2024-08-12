import { Box } from '@mui/material'
import logo from '@/src/assets/new_st_logo.png'
import { Outlet, useNavigate } from 'react-router'

export const Client = () => {
    const navigate = useNavigate()

    const reset = () => {
        navigate('/client/contact-type')
    }

    return (
        <>
            <Box sx={{ position: 'absolute', padding: 4 }} onClick={reset}>
                <img src={logo} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                <Outlet />
            </Box>
        </>
    )
}