import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";

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

    // Get Notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'applciation/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNjk2OTAxOTVjNjBjZmM4NTA3YmRmIn0sImlhdCI6MTY3NjA1NjI2OX0.JB-DODduAFr1YLmx_OyrOgxW5iZ9JurSyfPJsI0zemc'
            }
        });

        const json = await response.json();
        console.log(json.notes);
        setNotes(json.notes);
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        const note = {
            "_id": (Math.random() * (1000 - 1) + 1).toString(),
            "user": "63e69690195c60cfc8507bdf",
            "title": title,
            "description": description,
            "tag": tag,
            "timestamp": "2023-02-12T11:09:17.165Z",
            "__v": 0
        }

        const response = await fetch(`${host}/api/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'applciation/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNjk2OTAxOTVjNjBjZmM4NTA3YmRmIn0sImlhdCI6MTY3NjA1NjI2OX0.JB-DODduAFr1YLmx_OyrOgxW5iZ9JurSyfPJsI0zemc'
            },
            body: JSON.stringify({ title, description, tag })
        });

        setNotes(notes.concat(note));
    }

    // Edit Note
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'applciation/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNjk2OTAxOTVjNjBjZmM4NTA3YmRmIn0sImlhdCI6MTY3NjA1NjI2OX0.JB-DODduAFr1YLmx_OyrOgxW5iZ9JurSyfPJsI0zemc'
            },
            body: JSON.stringify({ title, description, tag })
        });
    }

    // Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'applciation/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNjk2OTAxOTVjNjBjZmM4NTA3YmRmIn0sImlhdCI6MTY3NjA1NjI2OX0.JB-DODduAFr1YLmx_OyrOgxW5iZ9JurSyfPJsI0zemc'
            }
        });
        const updatedNotes = notes.filter((note) => { return note._id !== id });
        setNotes(updatedNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
