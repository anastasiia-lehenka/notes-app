import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

export const NoteItem = props => {
    const {
        noteItem,
        deleteNote
    } = props;

    return (
        <div className="col-md-6 col-lg-3 mb-4">
            <div className="card">
                <div className="card-body">
                    <Link to={'/edit/' + noteItem._id}><i className="icon icon--edit fa fa-edit"></i></Link>
                    <p>{ noteItem.text }</p>
                    <i className="icon icon--delete fa fa-trash" onClick={deleteNote.bind(this, noteItem._id)}></i>
                </div>
            </div>
        </div>
    );
};
