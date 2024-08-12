import { Container } from '@mui/material'
import { ContactTypeSettings } from './ContactTypeSettings'

export const Settings = () => {
    return (
        <Container sx={{ paddingTop: 4 }}>
            <ContactTypeSettings />
        </Container>
    )
}