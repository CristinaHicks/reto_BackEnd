const Posts = require('../models/posts');

module.exports = {
    get: async(req, res, next) =>{
        const posts = await Posts.find().populate('user');  
        res.status(200).send({result: true, data: posts}); 
    },
    getById: async(req, res, next) => {
        const id = req.params.id;
        const post = await Posts.findOne({_id: id}).populate('user');
        res.status(200).send({result: true, data: post});
    },
    post: async (req, res) => {
        try{
            console.log(req.user._id);
            req.body["user"] = req.user._id;
            let post = await Posts.create(req.body);
            if(!post){
                res.status(502).send({msg: "Post not created", result: false, err: product})
            }post
            await post.save()
            res.status(201).send({msg: "Post created", result: true, data: post});
        } catch (error) {
            console.log(error);
            res.status(401).json({
              message: error.message || "unknown",
            });
        }
    },
    patch: async (req, res) => {
        try{
            req.body["user"] = req.user._id;
            console.log(req.body);
            const id = req.params.id; 
            let post = await Posts.updateOne({_id: id},req.body);
            if(!post){
                res.status(502).send({msg: "Post not updated", result: false, err: user})
            }
            res.status(201).send({msg: "Post updated", result: true, data: post});
        } catch (error) {
            console.log(error);
            res.status(401).json({
              message: error.message || "unknown",
            });
        }
    }, 
    delete: async (req, res) => {
        const id = req.params.id;
        let post = await Posts.deleteOne({_id: id});
        if(!post){
            res.status(502).send({msg: "Post not deleted", err: post})
        }
        res.status(201).send({msg: "Post deleted", data: post});
    }
};
