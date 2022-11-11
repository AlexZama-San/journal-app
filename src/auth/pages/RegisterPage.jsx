import { Alert, Button, Grid, Link, TextField } from "@mui/material"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink} from 'react-router-dom'
import { useForm } from "../../hooks/useForm"
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks"
import { AuthLayout } from "../layout/AuthLayout"

const formData = {
  email: '',
  password: '',
  displayName: ''
}


const formValidations = {
  email: [(value) => value.includes('@'), 'El email debe tener un @'],
  password: [(value) => value.length >= 6, 'El password debe tener al menos 6 caracteres'],
  displayName: [(value) => value.length >= 2, 'El nombre debe tener al menos 2 caracteres']

}

export const RegisterPage = () => {

  const dispatch = useDispatch()

  const {status, errorMessage } = useSelector(state => state.auth)

  const isCheckingAuth = useMemo(()=>status === 'checking', [status])

  const [formSubmitted, setFormSubmitted] = useState(false)

  const {email,password, displayName, onInputChange, formState, isFormValid, emailValid, passwordValid, displayNameValid} = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    if (!isFormValid) return
    dispatch(startCreatingUserWithEmailAndPassword(formState))
  }

  return (
    <AuthLayout title= 'Login'>
      <h1>Form Valid {isFormValid ? 'valido' : 'incorrecto'}</h1>

    <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
      <Grid container>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField
            label='Nombre Completo'
            type='text'
            placeholder='Tu nombre completo'
            fullWidth
            name='displayName'
            value={displayName}
            onChange={onInputChange}
            error= {!!displayNameValid && formSubmitted}
            helperText={displayNameValid}
          />
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField
            label='Correo'
            type='email'
            placeholder='tucorreo@gmail.com'
            fullWidth
            name="email"
            value={email}
            onChange={onInputChange}
            error= {!!emailValid && formSubmitted}
            helperText={emailValid}/>
            
        </Grid>
        <Grid item xs={12} sx={{mt: 2}}>
          <TextField
            label='Contraseña'
            type='Password'
            placeholder='Contraseña'
            fullWidth
            name='password'
            value={password}
            onChange={onInputChange}
            error= {!!passwordValid && formSubmitted}
            helperText={passwordValid}/>
        </Grid>

        <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
        <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>
          <Grid item xs={12} >
            <Button 
              disabled={isCheckingAuth} 
              type="submit"
              variant='contained' 
              fullWidth>
              Crear cuenta
            </Button>
          </Grid>
        </Grid>
        <Grid container direction='row' justifyContent='end'>
          <Link component={RouterLink} color='inherit' to='/auth/login'>
            ¿Ya tienes una cuenta?
          </Link>
        </Grid>
      </Grid>
    </form>
  </AuthLayout>

  )
}
