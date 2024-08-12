import { Box, Button, TextField, Typography } from '@mui/material'
import { signUp } from 'aws-amplify/auth'
import { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router'

export const SignUp = () => {
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const navigate = useNavigate()

    const handleEmailChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handlePasswordChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.currentTarget.value)
    }

    const handleVerifyPasswordChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVerifyPassword(e.currentTarget.value)
    }

    const handleSignUp = async () => {
        setIsSigningUp(true)

        if (password !== verifyPassword) {
            return // Show Error
        }

        const signUpResponse = await signUp({
            username: email,
            password
        })

        const userId = signUpResponse.userId

        if (userId) {
            navigate('/verify-account', { state: { userId, username: email, password } })
        }

        setIsSigningUp(false)
        // Show Error
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '50%' }}>
                <Typography variant='h2' sx={{ marginBottom: 4 }}>Sign Up</Typography>
                <form onSubmit={handleSignUp}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label='Email' value={email} onChange={handleEmailChange} sx={{ marginBottom: 2 }} />
                        <TextField label='Password' type='password' value={password} onChange={handlePasswordChange} sx={{ marginBottom: 2 }} />
                        <TextField label='Verify Password' type='password' value={verifyPassword} onChange={handleVerifyPasswordChange} />
                    </Box>
                    <Button variant='contained' disabled={isSigningUp} onClick={handleSignUp} sx={{ marginTop: 4 }}>Sign Up</Button>
                </form>
            </Box>
        </Box>
    )
}