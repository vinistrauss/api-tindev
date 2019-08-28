const axios = require('axios');
const Dev = require('../model/dev');


module.exports = {
    async store(req, res){

        //SE EU QUISER APENAS UMA VARIAVEL ESPECÍFICA QUE A REQUIÇÃO BASTA SEGUIR O EXEMPLO ABAIXO:
        const {username} = req.body;
        //console.log('username: ', username);

        const userExistis = await Dev.findOne({user:username});

        if(userExistis){
            return res.json(userExistis);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        //console.log('response: ', response.data);

        const {name, bio, avatar_url} = response.data;

        const dev = await Dev.create({
            name,
            user:username,
            bio, 
            avatar:avatar_url
        })

        return res.json(dev);
    },

    async index(req, res){
        const {user} = req.headers;        
        console.log("user: ",  user)
        const loggerUser = await Dev.findById(user);
        console.log("loggerUser: ",  loggerUser)
        const users = await Dev.find({
            $and:[
                {_id: {$ne: user}},
                {_id: {$nin: loggerUser.likes}},
                {_id: {$nin: loggerUser.dislikes}},
            ]
        })

        return res.json(users);
    }
};