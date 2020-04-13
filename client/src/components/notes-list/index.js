import React, {Component} from 'react';
import './styles.scss';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {NoteItem} from '../note-item';

export class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: []
        };
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {
        fetch('/api/notes')
            .then(res => res.json())
            .then(notes => this.setState({notes}))
            .catch(err => console.log(err));
    };

    deleteNote = id => {
        const { notes } = this.state;

        fetch(`/api/notes/${id}`, { method: 'DELETE' })
            .then(() => this.setState({ notes: notes.filter(item => item._id !== id) }))
            .catch(err => console.log(err));
    };

    render() {
        const { notes } = this.state;
        return (
            <div className="container p-4">
                <div className="mb-5 row">
                    <div className="col d-flex justify-content-end align-items-center">
                        <span className="mr-2">
                            <FormattedMessage id="create-new" defaultMessage="Create new note:" />
                        </span>
                        <Link to={'/create'}>
                            <button className="btn btn-sm btn-outline-danger" type="button">+</button>
                        </Link>
                    </div>
                </div>
                <div className="row">
                    {notes.length === 0 &&
                    <p className="col">
                        <FormattedMessage id="create-first" defaultMessage="Create your fist note" />
                    </p>
                    }
                    { notes.map(item =>
                        <NoteItem
                            noteItem={item}
                            key={item._id}
                            deleteNote={this.deleteNote}
                        />
                    )}
                </div>
            </div>
        );
    };
}
