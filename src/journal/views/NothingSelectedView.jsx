import { StartOutlined } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"


export const NothingSelectedView = () => {

  const { isSaving } = useSelector( state => state.journal)

  return (
    <Grid container
    className= { !isSaving ? '' : "animate__animated animate__backOutUp animate__faster"}
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main', borderRadius: 3, padding: 2}}
>
    <Grid item xs= {12}>
        <StartOutlined sx={{fontSize: 100, color: 'white'}}/>
    </Grid>
    <Grid item xs= {12}>
        <Typography color='white' variant='h5'>Seleccione o cree una nota</Typography>
    </Grid>
</Grid>
    
  )
}
