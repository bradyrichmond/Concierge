import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

export const LoadedNoConfig = () => {
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate('/login')
    }

    const goToSignUp = () => {
        navigate('/sign-up')
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Typography variant='h2'>Client is not configured. Login or Sign Up to configure.</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button variant='contained' onClick={goToLogin}>Login</Button>
                <Button variant='contained' onClick={goToSignUp}>Sign Up</Button>
            </Box>
        </Box>
    )
}