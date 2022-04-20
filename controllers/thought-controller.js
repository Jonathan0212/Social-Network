const { Thought, User } = require('../models');

// Object with add thought to user method on line 5
const thoughtController = {

    getAllThought(req,res) {
        Thought.find({})
        .populate({
            path:'reactions',
            select: '__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },



    addThought ({ params, body}, res) {
        console.log(body);
        Thought.create(body)
        .then (({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: {thoughts: _id} },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json({ message: 'Thought has been added!' });
        })
        .catch(err => res.json(err));
    },

// Add Reaction Method
    addReaction ({ params, body}, res) {
        Thought.findOneAndUpdate (
            { _id: params.thoughtId}, 
            {$push: {reactions: body} },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

// Remove Reaction Method
    removeReaction ({ params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: {reactions: {reactionId: params.reactionId } } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json (err));
    },

// Remove Thought Method
    removeThought ({ params }, res) {
        Thought.findOneAndDelete ({ _id: params.thoughtId})
        .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json({ message: 'No thought found with this id'});
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true} 
         );
    })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json ({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },    

 // Update Thought Method    
    updateThought ({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $set: body },
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

      
module.exports = thoughtController;

