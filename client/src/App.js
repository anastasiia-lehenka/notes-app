import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { NotesList } from './components/notes-list';
import { CreateNote } from './components/modify-note';
import { IntlProvider, FormattedMessage } from 'react-intl';
import messages from './languages';
import logo from './assets/images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: 'en'
        };
    }

    changeLang = e => {
        this.setState({lang: e.target.value});
    };

    render() {
        return (
            <IntlProvider
                locale={this.state.lang}
                messages={messages[this.state.lang]}>
                <Router>
                    <nav className="navbar navbar-light bg-light">
                        <div className="container">
                            <div className="d-flex align-items-center">
                                <Link to={'/'}>
                                    <img className="logo mr-3" src={logo} alt="logo"/>
                                </Link>
                                <h3>
                                    <FormattedMessage id="app-title" defaultMessage="Notes App" />
                                </h3>
                            </div>
                            <select className="custom-select" defaultValue="en" onChange={this.changeLang}>
                                <option value="en">EN</option>
                                <option value="rus">RUS</option>
                            </select>
                        </div>
                    </nav>
                    <Route path="/" exact component={NotesList}/>
                    <Route path={["/create", "/edit/:id"]} component={CreateNote}/>
                </Router>
            </IntlProvider>
        );
    };
}

export default App;
