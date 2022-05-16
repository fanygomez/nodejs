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

UserSchema.methods.toJSON = function () {
    const { __v, password,_id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}
module.exports = model('User',UserSchema);