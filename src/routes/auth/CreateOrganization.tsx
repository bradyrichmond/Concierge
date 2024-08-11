

import { useOrgStore } from '@/src/store/OrgStore'
import { useUserStore } from '@/src/store/UserStore'
import { Box, Button, TextField, Typography } from '@mui/material'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router'

export const CreateOrganization = () => {
    const [isVerifying, setIsVerifying] = useState(false)
    const [organizationName, setOrganizationName] = useState('')
    const currentUser = useUserStore().currentUser
    const createUser = useUserStore().createUser
    const createOrganization = useOrgStore().createOrganization
    const navigate = useNavigate()

    const handleNameChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOrganizationName(e.currentTarget.value)
    }

    const handleVerifyAccount = async () => {
        if (!organizationName || organizationName.length <= 3) {
            return // Show Error
        }

        if (!currentUser) {
            return // Show Error
        }

        setIsVerifying(true)

        try {
            const organization = await createOrganization({ name: organizationName, admin: currentUser.userId })
            await createUser({ id: currentUser.userId, allowAccessTo: [], orgId: organization.id, orgOwner: currentUser.userId })
            navigate('/employee')
        } catch {
            setIsVerifying(false)
            // Show Error
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '50%' }}>
                <Typography variant='h2' sx={{ marginBottom: '2rem' }}>What is your organization name?</Typography>
                <form onSubmit={handleVerifyAccount}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label='Organization Name' value={organizationName} onChange={handleNameChange} sx={{ marginBottom: '1rem' }} />
                    </Box>
                    <Button variant='contained' disabled={isVerifying} onClick={handleVerifyAccount} sx={{ marginTop: '2rem' }}>Next</Button>
                </form>
            </Box>
        </Box>
    )
}