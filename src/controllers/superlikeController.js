const Dev = require('../model/dev');


module.exports = {
    async store(req, res){

        console.log('recenbendo superlike: ', req.params.devId);
        console.log('dando o superlike: ', req.headers.user);
 
        const {user} = req.headers;
        const {devId} = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);


        if(!targetDev){
            return res.status(400).json({error:'dev not exists'})
        }

        if(targetDev.superlikes.includes(loggedDev._id) || targetDev.likes.includes(loggedDev._id)){
            const loggedSocket = req.connectedUsers[user];
            const targetSocket = req.connectedUsers[devId];

            if(loggedSocket){
                req.io.to(loggedSocket).emit('match', targetDev);
            }

            if(targetDev){
                req.io.to(targetSocket).emit('match', loggedDev);
            }
        }
        
        loggedDev.superlikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}