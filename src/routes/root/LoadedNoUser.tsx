import { Box, Button } from "@mui/material"

export const LoadedNoUser = () => {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Button>Load Consignor View</Button>
            </Box>
            <Box>
                <Button>Login</Button>
            </Box>
        </Box>
    )
}