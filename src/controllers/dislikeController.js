const Dev = require('../model/dev');


module.exports = {
    async store(req, res){
        console.log('recenbendo like: ', req.params.devId);
        console.log('dando o like: ', req.headers.user);

        const {user} = req.headers;
        const {devId} = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);


        if(!targetDev){
            return res.status(400).json({error:'dev not exists'})
        }
        
        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}

