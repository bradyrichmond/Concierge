

import { useOrgStore } from '@/src/store/OrgStore'
import { useUserStore } from '@/src/store/UserStore'
import { Box, Button, TextField, Typography } from '@mui/material'
import { getCurrentUser } from 'aws-amplify/auth'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router'

export const CreateOrganization = () => {
    const [isVerifying, setIsVerifying] = useState(false)
    const [organizationName, setOrganizationName] = useState('')
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

        const currentUser = await getCurrentUser()

        setIsVerifying(true)

        try {
            const organization = await createOrganization({ name: organizationName, admin: currentUser.userId })
            await createUser({ id: currentUser.userId, allowAccessTo: [], orgId: organization.id, orgOwner: currentUser.userId })
            navigate('/create-location')
        } catch {
            setIsVerifying(false)
            // Show Error
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '50%' }}>
                <Typography variant='h2' sx={{ marginBottom: 4 }}>What is your organization name?</Typography>
                <form onSubmit={handleVerifyAccount}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label='Organization Name' value={organizationName} onChange={handleNameChange} sx={{ marginBottom: 2 }} />
                    </Box>
                    <Button variant='contained' disabled={isVerifying} onClick={handleVerifyAccount} sx={{ marginTop: 4 }}>Next</Button>
                </form>
            </Box>
        </Box>
    )
}