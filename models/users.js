const  { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user_name:  {
        type: String,
        unique: true,
        required: true
    },
    profile_image:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        unique: true,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "email invalid!"],
    },
    role: {
        type: String,
        enum: {
            values: ['Admin','User']
        }
    },
    password:  {
        type: String,
        required: true
    }
},
{
    timestamps: true,
    statics: {
        encrypPassword: async(password) => {
            const salt = await bcrypt.genSalt(15);
            return await bcrypt.hash(password, salt);
        },
        comparePassword: async (password, hash) => {
            return await bcrypt.compare(password, hash);
        }
    }
}
);

const Users = model('users', userSchema);
module.exports =  Users;