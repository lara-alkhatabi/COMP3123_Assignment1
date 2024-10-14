// models/User.js

const { ObjectId } = require('mongodb');

class User {
    constructor(name, email) {
        this._id = new ObjectId(); // Generate a new ObjectId
        this.name = name;
        this.email = email;
    }
}

module.exports = User;
