
const bcrypt = require('bcrypt');
const Router = require('express').Router()
const User = require('../models/user')

// const arrimg = ["url1","url2","url3","url30"]

// register
Router.post('/register', async (req, res) => {
    const username = req.body.username
    const hash = req.body.passhash
    const img = req.body.arrimg
    let pwd = bcrypt.hashSync(hash, 10)

    const newUser = {
        username: username,
        passwordHash: pwd,
        images: img
    }

    const user = new User(newUser)
    try {
        const saveUser = await user.save(newUser)
        res.status(201).json(saveUser)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
    }
})

// getting 30 images
Router.post('/images', async (req, res) => {
    const username = req.body.username

    try {
        const user = await User.find({ username: username })
        res.status(200).json(user[0].images)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
    }
})

//login
Router.post('/login', async (req, res) => {
    const username = req.body.username
    const hash = req.body.passhash

    try {
        const user = await User.find({ username: username })

        let result = bcrypt.compareSync(hash, user[0].passwordHash)

        res.status(200).json({
            auth: result,
            username: user[0].username
        })

    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error: error })
    }
})

Router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json({ err: error })
    }

})


module.exports = Router