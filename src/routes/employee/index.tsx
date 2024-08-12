import { Box } from '@mui/material'
import { Outlet } from 'react-router'

export const Employee = () => {
    return (
        <Box sx={{ height: '100%', width: '100%' }}>
            <Outlet />
        </Box>
    )
}