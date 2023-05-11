const express = require('express');
const router = express.Router();
const statesData = require('./path_to_your_json_file.json'); // Update this path to point to your actual JSON file

// Get all states
router.get('/', (req, res) => {
    res.json(statesData);
});

// Get specific state by code
router.get('/:state', (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const state = statesData.find(state => state.code === stateCode);
    if (state) {
        res.json(state);
    } else {
        res.status(404).send('State not found');
    }
});

// Get fun facts of a specific state
// Note: This assumes that your state objects have a "funfacts" array property.
router.get('/:state/funfact', (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const state = statesData.find(state => state.code === stateCode);
    if (state && state.funfacts) {
        res.json(state.funfacts);
    } else {
        res.status(404).send('State or fun facts not found');
    }
});

// Add a fun fact to a specific state
// Note: This only adds the fun fact for the duration of the server process,
// the fun fact will not persist if the server restarts.
router.post('/:state/funfact', (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const newFunFact = req.body.funfact;
    const state = statesData.find(state => state.code === stateCode);
    if (state) {
        if (!state.funfacts) {
            state.funfacts = [];
        }
        state.funfacts.push(newFunFact);
        res.send('Fun fact added successfully');
    } else {
        res.status(404).send('State not found');
    }
});

module.exports = router;
