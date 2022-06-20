const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        require: [true, 'Required field.'],
        unique: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: Boolean,
        default: true,
        required: true
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, status, ...data} = this.toObject();
    return data;
}
module.exports = model('Category',CategorySchema);