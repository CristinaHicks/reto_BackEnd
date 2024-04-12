const Users = require('../models/users');
const auth = require('../middlewares/auth');

module.exports = {
    post: async (req, res) => {
        req.body.password = await Users.encrypPassword(req.body.password);
        let user = await Users.create(req.body);
        if(!user){
            res.status(502).send({msg: "User not created", err: user})
        }
        await user.save()
        res.status(201).send({msg: "User created", data: user});
    },login: async (req, res) => {
        const {email, password} = req.body;
        const reqUser = req.user;
        console.log("email",email)
        let user = await Users.findOne({email: email});
        console.log("user", user)
        if(!user){
            return res.status(404).send({msg: "User not found"});
        }
        let validPass = await Users.comparePassword(password, user.password);
        if(!validPass){
            return res.status(401).send({msg: "Incorrect password"});
        }
        let token = auth.generateToken(user);
        res.status(200).json({msg: "Usuario identificado correctamente", result: true, data: token});

    },get: async(req, res) => {
        const id = req.params.id;
        const user = await Users.findOne({_id: id});
        if(!user){
            return res.status(404).send({msg: "User not found"});
        }
        res.status(200).send({msg: "Usuario identificado correctamente", result: true, data: user});
    },
   getAll: async (req, res) => {
        try {
            const users = await Users.find()
            res.send({ msg: "All users", data: users })
        } catch (error) {
            res.status(400).send({ msg: "can't get users", error: error }) 
        }  
    }, 
}