import { Button, Grid, Link, TextField } from "@mui/material"
import { Link as RouterLink} from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"

export const RegisterPage = () => {
  return (
    <AuthLayout title= 'Login'>

    <form>
      <Grid container>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField
            label='Nombre Completo'
            type='text'
            placeholder='Tu nombre completo'
            fullWidth/>
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField
            label='Correo'
            type='email'
            placeholder='tucorreo@gmail.com'
            fullWidth/>
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField
            label='Contraseña'
            type='Password'
            placeholder='Contraseña'
            fullWidth/>
        </Grid>

        <Grid container spacing={2} sx={{mb: 2}}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" fullWidth sx={{mt: 2}}>
              Crear cuenta
            </Button>
          </Grid>
        </Grid>
        <Grid container direction='row' justifyContent='end'>
          <Link component={RouterLink} color='inherit' to='/auth/register'>
            ¿Ya tienes una cuenta?
          </Link>
        </Grid>
      </Grid>
    </form>
  </AuthLayout>

  )
}
