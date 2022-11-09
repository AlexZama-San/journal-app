import { AddOutlined } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"

export const JorunalPage = () => {
  return (
    <JournalLayout>

      {/* <Typography> este es un texto de relleno</Typography> */}
      <NothingSelectedView/>
      {/* <NoteView></NoteView> */}

      <IconButton
        size="large"
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
