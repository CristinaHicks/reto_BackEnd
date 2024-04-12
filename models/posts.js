const  { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const postSchema = new Schema({
    contenido: {
        type: String,
        required: true
    },
    datePost:  {
        type: Date,
        required: true
    },
    image:  {
        type: String,
        required: true
    },
    teamName:  {
        type: String,
        required: true
    },
    timeRead:  {
        type: Number,
        required: true
    },
    title:  {
        type: String,
        required: true
    },
    user: {
        type: String,
        ref: 'users'
    },
    tags: {
        type: Array,
        required: true
    }
},
{
    timestamps: true
}
);

const Posts = model('posts', postSchema);
module.exports =  Posts;