import { useClientStore } from '@/src/store/ClientStore'
import { useContactStore } from '@/src/store/ContactStore'
import { ClientDataInput } from '@/src/types'
import { Box, Button, FormControlLabel, Switch, TextField } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'

export const ClientData = () => {
    const [step, setStep] = useState<number>(0)
    const [clientId, setClientId] = useState<string>('')
    const navigate = useNavigate()
    const { state } = useLocation()
    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<ClientDataInput>()
    const { contactType } = state
    const createContact = useContactStore().createContact
    const createClient = useClientStore().createClient
    const lookupClientByPhone = useClientStore().lookupClientByPhone

    const phone = watch('phone')
    const oversizedItems = watch('oversizedItems')

    const handleCreateContact = async (contact: ClientDataInput) => {
        if (!clientId) {
            const clientData = await createClient(contact)
            setClientId(clientData.id)
        }

        await createContact(contactType, clientId)
        navigate('/client/contact-created')
    }

    const checkForExistingClient = async () => {
        try {
            const client = await lookupClientByPhone(phone)
            console.log('Found client')
            setValue('firstName', client.firstName)
            setValue('lastName', client.lastName)
            setClientId(client.id)
            setStep(2)
        } catch (e) {
            console.error(e as unknown as string)
            setStep((cur) => cur + 1)
        }
    }

    const next = async () => {
        if (step === 0) {
            await checkForExistingClient()
        } else {
            setStep((cur) => cur + 1)
        }
    }

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ height: '50%', width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <form onSubmit={handleSubmit(handleCreateContact)} style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ transform: `translatex(${step === 0 ? '0%' : '-200%'})`, transition: 'all .5s linear', position: 'relative', height: '100%', width: '100%' }}>
                        <Box sx={{ position: 'absolute', left: 0, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                type='tel'
                                {...register('phone')}
                                fullWidth
                                label='Phone Number'
                                sx={{ marginBottom: 2 }}
                                disabled={step > 0}
                            />
                            <Button variant='contained' fullWidth onClick={next}>Next</Button>
                        </Box>
                    </Box>
                    <Box sx={{ transform: `translatex(${step === 1 ? '0%' : '-200%'})`, transition: 'all .5s linear', position: 'relative', height: '100%', width: '100%' }}>
                        <Box sx={{ position: 'absolute', left: 0, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <TextField
                                {...register('firstName')}
                                fullWidth
                                label='First
                                Name'
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                {...register('lastName')}
                                fullWidth
                                label='Last Name'
                                sx={{ marginBottom: 2 }}
                            />
                            <Button variant='contained' fullWidth onClick={next}>Next</Button>
                        </Box>
                    </Box>
                    <Box sx={{ transform: `translatex(${step === 2 ? '0%' : '-200%'})`, transition: 'all .5s linear', position: 'relative', height: '100%', width: '100%' }}>
                        <Box sx={{ position: 'absolute', left: 0, height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <FormControlLabel control={<Switch {...register('oversizedItems')} />} label='Oversized Items?' />
                            <TextField
                                {...register('oversizedItemsDescription')}
                                fullWidth
                                label='Oversized Items Description'
                                sx={{
                                    marginBottom: 2,
                                    opacity: oversizedItems ? 1 : 0
                                }}
                            />
                            <Button variant='contained' fullWidth onClick={handleSubmit(handleCreateContact)}>Next</Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Box>
    )
}