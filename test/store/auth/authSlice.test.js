import { authSlice } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authFixtures";


describe('pruebas en el authSlice', () => {
    test('debe de regresar el estado inicial y llamarse el auth', () => {
        expect ( authSlice.name ).toBe('auth')

        const state = authSlice.reducer(initialState,{})
        expect( state ).toEqual(initialState)
    });
});