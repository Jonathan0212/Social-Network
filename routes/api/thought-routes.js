const router = require('express').Router();
const {
    getAllThought,
    
    addThought,
    removeThought,
    addReaction,
    updateThought,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThought)
    .post(addThought)


// /api/thoughts/{userId}
router
    .route('/:userId')
    

// /api/thoughts/{userId}/{thoughtId}
router
    .route('/:thoughtId')
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