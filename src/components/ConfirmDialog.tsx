import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material'

interface ConfirmDialogProps {
    close(): void
    message: string
    submit(): Promise<void>
    open: boolean
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
    const { close, message, open, submit } = props

    const handleSubmit = async () => {
        await submit()
        close()
    }

    return (
        <Dialog
            onClose={close}
            open={open}
            PaperProps={{
                component: 'form'
            }}
        >
            <DialogTitle>{message}</DialogTitle>
            <DialogActions>
                <Button variant='contained' onClick={close}>No</Button>
                <Button variant='contained' onClick={handleSubmit}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}