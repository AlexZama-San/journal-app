import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrl: [], // Array of strings
        // }
    },
    reducers: {
        creatingNewNote: (state) => {
            state.isSaving = true;
            state.savedMessage = '';
        },
        addNewNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false;
            state.savedMessage = `${action.payload.title} añadido a la base de datos correctamente`;

        },
        setActiveNote: (state, action) => {
            state.active = action.payload
            state.savedMessage = ''
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setSaving: (state) => {
            state.isSaving = true;
            //TODO: añadir mensaje de error
            state.savedMessage = ''
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note)
            state.savedMessage = `${action.payload.title} actualizado correctamente`
        },
        deleteNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.filter(note => note.id !== action.payload)
            state.savedMessage = `Nota eliminada correctamente`
            state.active = null
        },
        deactivateNote: (state) => {
            state.active = null
            state.notes = []
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrl = [...state.active.imageUrl, ...action.payload]
            state.isSaving = false;
        }



    }
});


// Action creators are generated for each case reducer function
export const { setPhotosToActiveNote,addNewNote, setActiveNote, setNotes, setSaving, updateNote, deleteNote, creatingNewNote, deactivateNote } = journalSlice.actions;