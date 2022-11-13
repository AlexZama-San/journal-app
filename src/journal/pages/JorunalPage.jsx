import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal/thunks"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const JorunalPage = () => {
  const { isSaving, active } = useSelector( state => state.journal)
  const dispatch = useDispatch()
  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>

      {/* <Typography> este es un texto de relleno</Typography> */}
      {
        active === null ? 
        <NothingSelectedView/>
        :
        <NoteView/>
      }

      <IconButton
        size="large"
        onClick={onClickNewNote}
        disabled={isSaving}
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.75 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>
      </IconButton>
      
    </JournalLayout>
  )
}
