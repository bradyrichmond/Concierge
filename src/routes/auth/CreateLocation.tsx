

import { useOrgStore } from '@/src/store/OrgStore'
import { Box, Button, TextField, Typography } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router'

export const CreateLocation = () => {
    const [isVerifying, setIsVerifying] = useState(false)
    const [locationName, setLocationName] = useState('')
    const createLocation = useOrgStore().createLocation
    const navigate = useNavigate()

    const handleNameChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLocationName(e.currentTarget.value)
    }

    const handleCreateLocation = async () => {
        if (!locationName || locationName.length <= 3) {
            return // Show Error
        }

        setIsVerifying(true)

        await createLocation(locationName)
        navigate('/employee')
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '50%' }}>
                <Typography variant='h2' sx={{ marginBottom: 4 }}>What is your first location name?</Typography>
                <form>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label='Location Name' value={locationName} onChange={handleNameChange} sx={{ marginBottom: 2 }} />
                    </Box>
                    <Button variant='contained' disabled={isVerifying} onClick={handleCreateLocation} sx={{ marginTop: 4 }}>Next</Button>
                </form>
            </Box>
        </Box>
    )
}