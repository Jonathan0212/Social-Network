const router = require('express').Router();
const {
    addThought,
    removeThought,
    addReaction,
    updateThought,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/{userId}
router
    .route('/:userId')
    .post(addThought);

// /api/thoughts/{userId}/{thoughtId}
router
    .route('/:thoughtId')
    .put(updateThought)
    .delete(removeThought);

// /api/thoughts/{thoughtsId}/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/{userId}/{thoughtId}
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;