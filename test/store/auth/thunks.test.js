import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuth, startCreatingUserWithEmailAndPassword, startGoogleSignIn, startLoginWithEmailAndPassword, startLogout } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";
jest.mock('../../../src/firebase/providers')

describe('Pruebas en authThunks', () => {
    const dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())
    test('debe de invocar el checking credentials en el authSlice', async() => {
        
        const valor = await checkingAuth()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        
    });

    test('startGoogleSignIn debe de llamar el login exitosamente', async() => {

        const loginData = {ok: true, ...demoUser}
        await signInWithGoogle.mockResolvedValue(loginData)

        await startGoogleSignIn()(dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    })

    test('startGoogleSignIn debe de llamar el login con error', async() => {
            
            const loginData = {ok: false, errorMessage: 'Credenciales no válidas'}
            await signInWithGoogle.mockResolvedValue(loginData)
    
            await startGoogleSignIn()(dispatch)
    
            expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
            expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))
        })

    test('startLoginWithEmailAndPassword debe de llamar checkingcredentials y login', async() => {
        const loginData = {ok: true, ...demoUser}
        const email = demoUser.email
        const password = '123456'
        await loginWithEmailAndPassword.mockResolvedValue(email, password)

        await startLoginWithEmailAndPassword(email,password)(dispatch)
        
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login({loginData}))
    })

    test('startLogout debe de llamar logoutFirebase, cleanNotes y logout', async() => {
        
        await startLogout()(dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(logout())
    });

    test('startCreatingUserWithEmailAndPassword debe de llamar checkingCredentials, registerUser y login', async() => {
        
        const {email, password, displayName} = demoUser

        await registerUserWithEmailAndPassword.mockResolvedValue({email, password, displayName})

        await startCreatingUserWithEmailAndPassword({email, password, displayName})(dispatch)

        expect(registerUserWithEmailAndPassword).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login({email, password, displayName}))
    });
});