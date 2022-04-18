const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');
const { remove } = require('../../models/User');

// GET All users and POST ALL users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// GET, PUT, and DELETE One
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// POST /:id/friends
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;

