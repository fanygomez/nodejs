const {Schema, model } = require('mongoose')

const RoleSchema = Schema({
    role:{
        type: String,
        require: [true, 'Required field.']
        
    }
});

//Export the model
module.exports = model('Role', RoleSchema);