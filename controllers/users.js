const users = require('../data/users.js')

const getUsers = ((req, res) => {
    res.json(users)
})

const getUser = ((req, res) => {
    const id = Number(req.params.userID)
    const user = users.find(user => user.id === id)

        if (!user) {
        return res.status(404).send('User not found')
    }
    res.json(user)
})

const createUser = ((req, res) => {
    const newUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    }
    users.push(newUser)
    res.status(201).json(newUser)
})

const updateUser = ((req, res) => {
    const id = Number(req.params.userID)
    const index = users.findIndex(user => user.id === id)
    const updatedUser = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password
    }

    users[index] = updatedUser
    res.status(200).json('User updated')
})

const deleteUser = ((req, res) => {
    const id = Number(req.params.userID)
    const index = users.findIndex(user => user.id === id)
    users.splice(index,1)
    res.status(200).json('User deleted')
})

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}