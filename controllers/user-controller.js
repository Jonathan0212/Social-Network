const { User } = require('../models');

const userController = {
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select:'-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

// Find User by ID Method
    getUserById({ params}, res) {
        User.findOne({ _id: params.id })
        .populate({
            path:'thoughts',
            select:'-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // Create A User Method
    createUser ({ body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(404).json(err));
    },

    // Update a User by ID Method
    updateUser({ params, body}, res){
        User.findOneAndUpdate ({ _id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {if(!dbUserData) {
            res.status(404).json({ message: 'No user fonud with this id!'});
            return;
        }
        res.json(dbUserData);
    })
        .catch(err => res.status(400));
    },

    // deleting a user method
    deleteUser ({ params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // adding friend method
    addFriend(req, res) {
        User.findOneAndUpdate ({ _id: req.params.userId}, {$addToSet: {friends: req.params.friendId} }, {new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json({ message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // removing friend method
    removeFriend (req, res) {
        User.findOneAndUpdate({ _id: req.params.userId}, {$pull: { friends: req.params.friendId} }, {new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                return res.status(404).json ({ message: 'No user found with this id!'});
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;