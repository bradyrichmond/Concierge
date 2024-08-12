import { LocalContactType, useContactStore } from '@/src/store/ContactStore'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'

export const WaitingContacts = () => {
    const subscribeToContacts = useContactStore().subscribeToContacts
    const contacts = useContactStore().contacts

    useEffect(() => {
        subscribeToContacts()
    }, [subscribeToContacts])

    return (
        <Box sx={{ height: '100%', width: '100%', padding: 4 }}>
            {contacts.map((c: LocalContactType) => <Typography sx={{ marginBottom: 4 }}>{`${c.client.firstName} ${c.client.lastName}`}</Typography>)}
        </Box>
    )
}