import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth/authSlice";
import { MemoryRouter } from "react-router-dom";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn()
}))

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('pruebas en el login page', () => {
    


    test('debe de mostrar el componente correctamente', () => {
        
        render(
            <Provider store={store}>
                <MemoryRouter>

                    <LoginPage />

                </MemoryRouter>
                
            </Provider>
        )

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });

    test('el boton de google debe de llamar el StartGoogleSignIn', () => {
        
        render(
            <Provider store={store}>
                <MemoryRouter>

                    <LoginPage />

                </MemoryRouter>
                
            </Provider>
        )

        const googleBtn = screen.getByLabelText('google-btn')

        fireEvent.click(googleBtn)

        console.log(store.getState())

    });
});