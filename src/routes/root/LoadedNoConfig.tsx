import { Box, Button, Typography } from '@mui/material'

export const LoadedNoConfig = () => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Typography variant='h2'>Client is not configured. Login or Sign Up to configure.</Typography>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <Button variant='contained'>Login</Button>
                <Button variant='contained'>Sign Up</Button>
            </Box>
        </Box>
    )
}