const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'Required field.']
    },
    email:{
        type: String,
        required: [ true, 'Required field.'],
        unique: true
    },
    password:{
        type: String,
        required: [ true, 'Required field.']
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        // required: [ true, 'Required field.'],
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: true
    }
});

module.exports = model('User',UserSchema);