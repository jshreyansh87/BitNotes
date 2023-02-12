import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {

    const initialNotes = [
        {
            "_id": "63e8c8dbbf72a40b33e64378",
            "user": "63e69690195c60cfc8507bdf",
            "title": "fchgchc",
            "description": "gchgn",
            "tag": "ksjbk",
            "timestamp": "2023-02-12T11:09:15.347Z",
            "__v": 0
        },
        {
            "_id": "63e8c8ddbf72a40b33e6437a",
            "user": "63e69690195c60cfc8507bdf",
            "title": "231fchgchc",
            "description": "1234gchgn",
            "tag": "ksjbk",
            "timestamp": "2023-02-12T11:09:17.165Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(initialNotes);

    // Add Note
    const addNote = (title, description, tag) => {
        const note = {
            "_id": "63e8c8ddbf72a40b33e6437a",
            "user": "63e69690195c60cfc8507bdf",
            "title": title,
            "description": description,
            "tag": tag,
            "timestamp": "2023-02-12T11:09:17.165Z",
            "__v": 0
        }

        // TODO: API Call
        setNotes(notes.concat(note));
    }

    // Edit Note
    const editNote = () => {

    }

    // Delete Note
    const deleteNote = () => {
        
    }

    return (
        <NoteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
