import { startNewNote } from "../../../src/store/journal/thunks";

describe('pruebas en Journal Thunks', () => {
    
    const dispatch = jest.fn()
    const getState = jest.fn()
    const uid = '123'

    beforeEach(() => jest.clearAllMocks())

    test('startNewNote debe crear una nueva nota en blanco', async() => {
        const uid = '12341561'

        getState.mockReturnValue({auth: {uid}})
        
        await startNewNote()(dispatch, getState)
    });
});