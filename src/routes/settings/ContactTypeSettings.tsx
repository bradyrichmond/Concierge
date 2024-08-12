import { ContactTypeType } from '@/src/types'
import { Paper, Typography, Box, Button, Divider } from '@mui/material'
import { useSettingsStore } from '@/src/store/SettingsStore'
import { useState, useEffect } from 'react'
import { ContactTypeItem } from './ContactTypeItem'
import { AddContactTypeDialog } from './AddContactTypeDialog'

export const ContactTypeSettings = () => {
    const [isAddingContactType, setIsAddingContactType] = useState<boolean>(false)
    const contactTypes = useSettingsStore().contactTypes
    const updateContactTypes = useSettingsStore().updateContactTypes

    useEffect(() => {
        updateContactTypes()
    }, [updateContactTypes, isAddingContactType])

    const toggleIsAddingContactType = () => {
        setIsAddingContactType((cur) => !cur)
    }

    return (
        <>
            <AddContactTypeDialog open={isAddingContactType} close={toggleIsAddingContactType} />
            <Paper sx={{ padding: 4 }} elevation={6}>
                <Typography variant='h3'>Contact Types</Typography>
                <Box sx={{ marginTop: 2 }}>
                    <Box>
                        {contactTypes.map((d: ContactTypeType) => <ContactTypeItem d={d} />)}
                    </Box>
                    <Divider sx={{ marginBottom: 2 }} />
                    <Box>
                        <Button variant='contained' onClick={toggleIsAddingContactType}>Add Contact Type</Button>
                    </Box>
                </Box>
            </Paper>
        </>
    )
}