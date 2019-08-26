const {Router} = require('express')
const User = require('./app/models/User')

const routes = new Router()

routes.get('/', async (req, res) => {
    const user = await User.create({
        name:'Rodrigo',
        email: 'rodrigo.fonsecamartins@gmail.com',
        password_hash: '1234',
        provider: false,
    })
    return res.json(user)
})

module.exports = routes