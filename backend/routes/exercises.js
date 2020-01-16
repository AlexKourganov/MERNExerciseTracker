const router = require('express').Router();
let Exercise = require('../models/exercise.model');


router.route('/').get((req,res)=>{
    // mongoose method that returns a promise
Exercise.find().then(exercises => res.json(exercises)).catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    // convert to date and date
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);



    const newExercise  = new Exercise({username,description,duration,date});

    newExercise.save().then(()=>res.json('Exercise Added!')).catch(err => res.status(400).json('Error: ' + err));
});

// Specific id created by mongodb, if exercise is found return it
router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id).then(exercise   => res.json(exercise)).catch(err =>res.status(400).json('Error: '+err));
});
// Delete
router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id).then( () => res.json('Exercise Deleted!')).catch(err =>res.status(400).json('Error: '+err));
});

// Update
router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then( exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save().then(()=>res.json('Exercise Updated!')).catch(err =>res.status(400).json('Error: '+err));
    })
    .catch(err =>res.status(400).json('Error: '+err));
});


module.exports = router;