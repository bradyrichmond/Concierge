import { Box, Button } from '@mui/material'
import { useNavigate } from 'react-router'

export const LoadedNoUser = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Button>Load Client View</Button>
            </Box>
            <Box>
                <Button onClick={goToLogin}>Login</Button>
            </Box>
        </Box>
    )
}