import { Box, Button } from '@mui/material'
import { useSettingsStore } from '@/src/store/SettingsStore'
import { ContactTypeType } from '@/src/types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export const ContactType = () => {
    const contactTypes = useSettingsStore().contactTypes
    const updateContactTypes = useSettingsStore().updateContactTypes
    const navigate = useNavigate()

    useEffect(() => {
        updateContactTypes()
    }, [updateContactTypes])

    const next = (contactType: string) => {
        console.log(`Starting process for ${contactType}`)
        navigate('/client/client-data', { state: { contactType } })
    }

    return (

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
                {contactTypes.map((d: ContactTypeType) => <Button variant='contained' key={d.id} sx={{ marginBottom: 2 }} id={d.id} onClick={() => next(d.id)}>{d.label}</Button>)}
            </Box>
        </Box>
    )
}