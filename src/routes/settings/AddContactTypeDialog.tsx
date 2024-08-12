import { useSettingsStore } from '@/src/store/SettingsStore'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Button, DialogActions } from '@mui/material'
import { SyntheticEvent, useState } from 'react'

interface AddContactTypeDialogProps {
    open: boolean
    close(): void
}

export const AddContactTypeDialog = (props: AddContactTypeDialogProps) => {
    const [label, setLabel] = useState('')
    const { close, open } = props
    const createContactType = useSettingsStore().createContactType

    const handleSubmit = async () => {
        await createContactType(label)
        close()
    }

    const handleChange = (e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLabel(e.currentTarget.value)
    }

    return (
        <Dialog
            onClose={close}
            open={open}
            PaperProps={{
                component: 'form'
            }}
        >
            <DialogTitle>Create a new Drop Off Type</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    This will add a button to your client welcome screen
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    id='contactLabel'
                    name='contactLabel'
                    label='Drop Off Label'
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={close}>Cancel</Button>
                <Button variant='contained' onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}