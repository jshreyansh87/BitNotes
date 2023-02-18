import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
    const host = "http://localhost:5000";

    const [notes, setNotes] = useState([]);

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
        const response = await fetch(`${host}/api/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'applciation/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlNjk2OTAxOTVjNjBjZmM4NTA3YmRmIn0sImlhdCI6MTY3NjcwMzI4NX0.T2HBEMRKF1K55P1CKPqHAqgs5BwqnMCuPe2OAb7ksRk'
            },
            body: JSON.stringify({ title, description, tag })
        });

        getNotes();
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

        getNotes();
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
        
        getNotes();
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
