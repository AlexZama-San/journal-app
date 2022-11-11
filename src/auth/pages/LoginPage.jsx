import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import { checkingAuth, startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"

export const LoginPage = () => {


  const dispatch = useDispatch()
  const {email,password, onInputChange, formState} = useForm({
    email: '',
    password: ''
  })

  const {status, errorMessage} = useSelector(state => state.auth)

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const onSubmit = (e) => {
    e.preventDefault()
    console.log({email,password})
    dispatch(startLoginWithEmailAndPassword(email,password))
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    
    <AuthLayout title= 'Login'>

        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField
                label='Correo'
                type='email'
                placeholder='correo@google.com'
                name='email'
                value={email}
                onChange={onInputChange}
                fullWidth/>
            </Grid>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField
                label='Contraseña'
                type='Password'
                placeholder='Contraseña'
                name='password'
                value={password}
                onChange={onInputChange}
                fullWidth/>
            </Grid>

            <Grid container >
              <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mb: 2}}>
              <Grid item xs={12} sm={6}>
                <Button type="submit" disabled={isAuthenticating} variant="contained" fullWidth sx={{mt: 2}}>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button onClick={onGoogleSignIn} disabled={isAuthenticating} variant="contained" fullWidth sx={{mt: 2}}>
                  <Google/>
                    <Typography sx={{ml: 1}}>
                      Google
                    </Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
      </AuthLayout>

  )
}
