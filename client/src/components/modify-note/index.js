import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles.scss';
import {FormattedMessage} from "react-intl";

export class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            text: '',
            redirect: null
        };
        this.state = this.initialState;
        this.id = this.props.match.params.id;
    }

    componentDidMount() {
       if (this.id) {
           this.getNote(this.id);
       }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitForm = e => {
        e.preventDefault();
        if (!this.id) {
            this.addNewNote({text: this.state.text});
        } else {
            this.editNote(this.id, {text: this.state.text});
        }
    };

    getNote = id => {
        fetch(`/api/notes/${id}`)
            .then(res => res.json())
            .then(note => this.setState({text: note.text}))
            .catch(err => console.log(err));
    };

    addNewNote = item => {
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(() => this.setState({ redirect: '/' }))
            .catch(err => console.log(err));
    };

    editNote = (id, item) => {
        fetch(`/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(() => this.setState({ redirect: '/' }))
            .catch(err => console.log(err));
    };

    render() {
        const {
            text,
            redirect
        } = this.state;

        return (
            redirect ?
                <Redirect to={redirect}/>
                : <div className="container p-4">
                    <div className="row justify-content-center">
                        <form className="col-md-6 col-lg-4" onSubmit={this.onSubmitForm}>
                            <FormattedMessage id="placeholder" defaultMessage="Type your text here (min 3 symbols)....">
                            {
                                (msg) =>  <textarea
                                    className="textarea form-control mb-3"
                                    name="text"
                                    placeholder={msg}
                                    maxLength="200"
                                    minLength="3"
                                    value={text}
                                    onChange={this.onChange}
                                    required>
                            </textarea>
                            }
                        </FormattedMessage>
                            <button className="btn btn-light" type="submit">
                                <FormattedMessage id="save" defaultMessage="Save"/>
                            </button>
                        </form>
                    </div>
                </div>
        );
    }
}
