const router = require('express').Router();
const {
    getAllThought,
    getThoughtByID,
    addThought,
    removeThought,
    addReaction,
    updateThought,
    removeReaction
} = require('../../controllers/thought-controller');
// /api/thoughts - GETS ALL THOUGHTS
router
    .route('/')
    .get(getAllThought)
    .post(addThought);


// /api/thoughts/{userId}
router
    .route('/:userId')
    .get(getThoughtByID)
    .put(updateThought)
    .delete(removeThought);


// /api/thoughts/{thoughtsId}/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/{userId}/{thoughtid}
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;