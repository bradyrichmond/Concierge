import { Box, Button, TextField, Typography } from '@mui/material'
import { signIn } from 'aws-amplify/auth'
import { SyntheticEvent, useState } from 'react'

export const Login = () => {
    const [isLogginIn, setIsLoggingIn] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handlePasswordChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.currentTarget.value)
    }

    const handleLogIn = async () => {
        setIsLoggingIn(true)
        const signInResponse = await signIn({
            username: email,
            password
        })

        if (signInResponse.isSignedIn) {
            // navigate
            return
        }

        setIsLoggingIn(false)
        // showError
    }

    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ width: '50%' }}>
                <Typography variant='h2' sx={{ marginBottom: 4 }}>Log In</Typography>
                <form onSubmit={handleLogIn}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TextField label='Email' value={email} onChange={handleEmailChange} sx={{ marginBottom: 2 }} />
                        <TextField label='Password' type='password' value={password} onChange={handlePasswordChange} />
                    </Box>
                    <Button variant='contained' disabled={isLogginIn} onClick={handleLogIn} sx={{ marginTop: 4 }}>Log In</Button>
                </form>
            </Box>
        </Box>
    )
}