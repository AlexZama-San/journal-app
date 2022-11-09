import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"

export const NoteView = () => {
  return (
    <Grid container direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light' >28 de agosto, 2023</Typography>
        </Grid>
        <Grid item>
            <Button color="primary" sx={{padding: 2}}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1}}/>
                    Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField type='text'
                variant='filled'
                fullWidth
                placeholder='ingrese un titulo'
                label='titulo'
                sx={{border: 'none', mb: 1}}></TextField>

            <TextField type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Que paso hoy?'
                minRows={5}></TextField>
        </Grid>

        {/*Image Gallery*/ }
        <ImageGallery/>
    </Grid>
  )
}
