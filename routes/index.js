const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Note = require('../model/Note');

router.use(express.json());

const schema = {
    text: Joi.string().min(3).required(),
};

router.get('/', (req, res, next) => {
    Note.find().then(notesList => {
        res.send(notesList);
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    Note.findById(req.params.id).then(note => {
        res.send(note);
    }).catch(next);
});

router.delete('/:id', (req, res, next) => {
    Note.findByIdAndDelete(req.params.id).then(() => {
        res.send();
    }).catch(next);
});

router.post('/', async (req, res) => {
    const validationError = validate(req.body);
    if (validationError) {
        res.status(404).send(validationError);
    }
    const noteItem = await Note.create(req.body);
    res.send(noteItem);
});

router.put('/:id', (req, res, next) => {
    const validationError = validate(req.body);
    if (validationError) {
        res.status(404).send(validationError);
    }

    Note.findByIdAndUpdate(req.params.id, req.body, {new: true}).then(noteItem => {
        res.send(noteItem);
    }).catch(next);
});

const validate = (item) => {
    const validationResult = Joi.validate(item, schema);
    return validationResult.error ? validationResult.error.details[0].message : null;
};

module.exports = router;