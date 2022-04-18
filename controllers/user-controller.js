const res = require('express/lib/response');
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

// Find User by ID
    getUserById({ param}, res) {
        User.findOne({ _id: URLSearchParams.id })
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

    // Create A User
    createUser ({ body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(404).json(err));
    },

    // Update a User by ID
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

    // deleting a user
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
    }
}