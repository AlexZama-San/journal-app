import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { demoUser, initialState } from "../../fixtures/authFixtures";


describe('pruebas en el authSlice', () => {
    test('debe de regresar el estado inicial y llamarse el auth', () => {
        expect ( authSlice.name ).toBe('auth')

        const state = authSlice.reducer(initialState,{})
        expect( state ).toEqual(initialState)
    });

    test('debe de realizar la autenticación', () => {
       
        const state = authSlice.reducer(initialState, login(demoUser))
        console.log(state);

        expect( state ).toEqual({
            status: 'authenticated',
            uid: '123',
            email: 'demo@demo.com',
            displayName: 'Demo',
            photoURL: 'https://th.bing.com/th/id/OIP.Q3i9MlwoLYZVv9gqRRaDgAHaJO?pid=ImgDet&rs=1',
            errorMessage: null,
        })

    })

    test('debe de realizar el logout sin argumentos', () => {
        const state = authSlice.reducer(initialState, login(demoUser))
        expect( state ).toEqual({
            status: 'authenticated',
            uid: '123',
            email: 'demo@demo.com',
            displayName: 'Demo',
            photoURL: 'https://th.bing.com/th/id/OIP.Q3i9MlwoLYZVv9gqRRaDgAHaJO?pid=ImgDet&rs=1',
            errorMessage: null
        })
        const stateLogout = authSlice.reducer(state, logout())
        
        expect( stateLogout ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    });

    test('debe de realizar el logout con argumentos', () => {
        const errorMessage = 'Credenciales no válidas'

        const state = authSlice.reducer(initialState, login(demoUser))
        expect( state ).toEqual({
            status: 'authenticated',
            uid: '123',
            email: 'demo@demo.com',
            displayName: 'Demo',
            photoURL: 'https://th.bing.com/th/id/OIP.Q3i9MlwoLYZVv9gqRRaDgAHaJO?pid=ImgDet&rs=1',
            errorMessage: null
        })
        const stateLogout = authSlice.reducer(state, logout({errorMessage}))
        expect ( stateLogout ).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: 'Credenciales no válidas'
        })
    });

    test('debe de cambiar el estado a checking', () => {
        
        const state = authSlice.reducer(initialState, checkingCredentials())

        expect( state ).toEqual({
            status: 'checking',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: null
        })
    });
});