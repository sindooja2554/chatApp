const User = require('../app/model/user')
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Fields can not be empty"
        });
    }

    // Create a user
    const user = new User({
        firstName: req.body.firstName, //|| "Untitled Note", 
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email
    });

    // Save Note in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding the user."
        });
    });
};

exports.display=(req,res) => {
    user.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Feilds can not be empty"
        });
    }

    // Find note and update it with the request body
    User.findByIdAndUpdate(req.params._ID, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params._ID
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params._ID
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params._ID
        });
    });
};