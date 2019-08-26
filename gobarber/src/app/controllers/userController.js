const User = require('../models/User')

class UserControler{
    async store (req, res) {
        try {
            const userExist = await User.findOne({ where: { email: req.body.email } })
            if(userExist){
                return res.status(400).json({error: 'Usuario ja existe!'})
            }           
            const {id, name, email, provider} = await User.create( req.body )
            return res.json({id, name, email, provider})

        } catch (error) {
            return res.status(400).json({error: error.errors[0].message})
        }
       
    }
}

module.exports = new UserControler()