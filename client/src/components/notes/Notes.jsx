import React, { useContext, useEffect } from 'react';
import noteContext from '../../context/notes/noteContext';
import AddNoteForm from './AddNoteForm';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes } = context;
    // getNotes();

    useEffect(() => {
        getNotes();
    }, [])

    return (
        <>
            <AddNoteForm />

            <div className="row my-3">
                <h1>Your Notes</h1>
                {
                    notes && notes.map((note) => {
                        return <NoteItem key={note._id} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes
