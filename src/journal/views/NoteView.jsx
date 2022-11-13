import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'
import { useForm } from "../../hooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingImages } from "../../store/journal/thunks"
import { ImageGallery } from "../components/ImageGallery"

export const NoteView = () => {

    const dispatch = useDispatch()
    const {active:note, savedMessage, isSaving} = useSelector(state => state.journal)
    const {body, title, onInputChange, formState, date} = useForm(note)

    const dateString = useMemo(()=> {
        const dateInDate = new Date(date)
        return dateInDate.toUTCString()
    },[date])

    const fileInputRef = useRef()

    useEffect(() => {
      dispatch(setActiveNote(formState))
    }, [formState])

    const onSaveNote = () => {
        dispatch(startSaveNote())
    }

    const onDelete = () => {
        dispatch(startDeletingNote())
        Swal.fire('Nota Eliminada', savedMessage, 'success')
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return
        dispatch(startUploadingImages(target.files))
    }

    useEffect(() => {
      if(savedMessage.length > 0){
        Swal.fire('Nota guardada', savedMessage, 'success')
      }
    
    }, [savedMessage])
    
    

  return (
    <Grid container className="animate__animated animate__backInDown animate__faster" direction='row' justifyContent='space-between' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light' >{dateString}</Typography>
        </Grid>
        <Grid item>
            <input
                type='file'
                multiple
                onChange={onFileInputChange}
                style={{display: 'none'}}
                ref={fileInputRef}    
            />

            <IconButton onClick={() => fileInputRef.current.click()} color='primary' disabled={isSaving}>
                <UploadFileOutlined/>
            </IconButton>

            <Button disabled={isSaving} onClick={onSaveNote} color="primary" sx={{padding: 2}}>
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
                sx={{border: 'none', mb: 1}}
                name='title'
                value={title}
                onChange={onInputChange}
                ></TextField>

            <TextField type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='¿Que paso hoy?'
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}
                ></TextField>
        </Grid>

        <Grid container justifyContent={'end'} >
            <Button
                onClick = {onDelete}
                sx ={{mt: 2}}
                color= 'error'>
                <DeleteOutline />
                Borrar Nota
            </Button>
        </Grid>

        {/*Image Gallery*/ }
        <ImageGallery images={note.imageUrl}/>
    </Grid>
  )
}
