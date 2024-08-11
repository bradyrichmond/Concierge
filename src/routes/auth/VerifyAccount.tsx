import { useUserStore } from '../../store/UserStore'
import { Box, Button, TextField, Typography } from '@mui/material'
import { confirmSignUp, signIn } from 'aws-amplify/auth'
import { SyntheticEvent, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export const VerifyAccount = () => {
    const [isVerifying, setIsVerifying] = useState(false)
    const [code, setCode] = useState('')
    const { state } = useLocation()
    const { userId, username, password } = state
    const updateUserData = useUserStore().updateUserData
    const navigate = useNavigate()

    useEffect(() => {
        if (!userId) {
            // Show Error
        }
    }, [userId])

    const handleCodeChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCode(e.currentTarget.value)
    }

    const handleVerifyAccount = async () => {
        if (!code || code.length !== 6) {
            return // Show Error
        }

        setIsVerifying(true)

        const confirmSignUpResponse = await confirmSignUp({
            username: userId,
            confirmationCode: code
        })

        if (confirmSignUpResponse.isSignUpComplete) {
            await signIn({ username, password })
            await updateUserData()
            navigate('/create-organization')
            return
        }

        setIsVerifying(false)
        // Show Error
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '50%' }}>
                <Typography variant='h2' sx={{ marginBottom: '2rem' }}>You should have received a verification email with a 6 digit code. Please enter it here.</Typography>
                <form onSubmit={handleVerifyAccount}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label='Email' value={code} onChange={handleCodeChange} sx={{ marginBottom: '1rem' }} />
                    </Box>
                    <Button variant='contained' disabled={isVerifying} onClick={handleVerifyAccount} sx={{ marginTop: '2rem' }}>Log In</Button>
                </form>
            </Box>
        </Box>
    )
}