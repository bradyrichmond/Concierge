import { ConfirmDialog } from '@/src/components/ConfirmDialog'
import { useSettingsStore } from '@/src/store/SettingsStore'
import { ContactTypeType } from '@/src/types'
import { Box, Button } from '@mui/material'
import { useMemo, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

interface ContactTypeItemProps {
    d: ContactTypeType
}

export const ContactTypeItem = ({ d }: ContactTypeItemProps) => {
    const [isShowingConfirmDialog, setIsShowingConfirmDialog] = useState<boolean>(false)
    const deleteContactType = useSettingsStore().deleteContactType

    const confirmMessage = useMemo(() => {
        return `Are you sure you want to delete ${d.label}?`
    }, [d])

    const toggleIsShowingConfirmDialog = () => {
        setIsShowingConfirmDialog((cur) => !cur)
    }

    const confirmDelete = async () => {
        await deleteContactType(d.id)
    }

    return (
        <Box sx={{ paddingBottom: 2, display: 'flex', flexDirection: 'row' }}>
            <ConfirmDialog open={isShowingConfirmDialog} close={toggleIsShowingConfirmDialog} submit={confirmDelete} message={confirmMessage} />
            <Box sx={{ flex: 1 }}>
                <Button fullWidth variant='contained'>{d.label}</Button>
            </Box>
            <Box sx={{ paddingLeft: 2 }}>
                <Button variant='contained' onClick={toggleIsShowingConfirmDialog}><DeleteForeverIcon /></Button>
            </Box>
        </Box>
    )
}