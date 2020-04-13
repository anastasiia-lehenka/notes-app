const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const noteSchema = new Schema({
    text: {
        type: String,
        required: [true, 'Text field is required']
    }
}, { versionKey: false });

const Note = model('notes', noteSchema);

module.exports = Note;