const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require ('./routes');
const Note = require('./model/Note');


app.use('/api/notes', router);
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});

mongoose.connect('mongodb://localhost:27017/notesDB',{ useNewUrlParser: true,  useUnifiedTopology: true }, error => {
    const PORT = process.env.PORT || 5000;

    init();
    if(error) return console.log(error);
    app.listen(PORT, () => { console.log(`App has been started on port ${PORT}...`) });
});

init = () => {
    const notes = [
        {text: 'Hello World!'},
        {text: 'Note 1'}
    ];

    Note.deleteMany({}, () => {
        notes.forEach(item => {
            Note.create(item);
        })
    });
};
