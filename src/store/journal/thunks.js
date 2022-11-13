import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { DB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewNote, creatingNewNote, deactivateNote, deleteNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(creatingNewNote())
        
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrl: []
        }

        const newDoc = doc ( collection (DB, `${uid}/journal/notes`) );
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id;

        //disptaches
        dispatch ( addNewNote(newNote) )
        dispatch ( setActiveNote (newNote) )
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('uid not found')
        const notes = await loadNotes(uid)

        dispatch ( setNotes(notes) )
    }
}

export const startActiveNote = (note) => {
    return async (dispatch) => {
        dispatch ( setActiveNote (note) )
    }
}

export const startDeactiveNote = () => {
    return async (dispatch) => {
        
        dispatch ( deactivateNote () )
    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch (setSaving())
        const {uid} = getState().auth;
        if (!uid) throw new Error('uid not found')
        const {active:note} = getState().journal;
        if (!note) throw new Error('note not found')
        const noteToFirestore = {...note}
        delete noteToFirestore.id

        const docRef = doc(DB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFirestore, {merge: true})
        dispatch(updateNote(note))
    }
}

export const startUploadingImages = (files = []) => {
    return async (dispatch, getState) => {
        dispatch (setSaving())
        // await fileUpload( files[0] )

        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
            
        }

        const photosURLs = await Promise.all(fileUploadPromises)
        
        dispatch (setPhotosToActiveNote (photosURLs))

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        const {active:note} = getState().journal;
        if (!note) throw new Error('note not found')
        const docRef = doc(DB, `${uid}/journal/notes/${note.id}`)
        await deleteDoc(docRef)
        dispatch (deleteNote (note.id))
    }
}