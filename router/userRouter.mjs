import express from 'express'
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from '../keycloack/users.mjs'

const router = express.Router()

router.get('/users', async (req, res) => {
    const {
        realm,
    } = req.query

    try {
        const users = await getUsers(realm)
        res.json(users)
    } catch {
        res.status(404).send('Realm Not found')
    }
})

router.post('/users', async (req, res) => {
    const {
        realm,
        user,
    } = req.body
    try {
        const userCreate = await createUser(realm, user)
        res.status(200).json({
            message: 'User created',
            userId: userCreate.id,
        })
    } catch {

        res.status(500).send('Server Interbnal Error')
    }
})

router.put('/users/:id', async (req, res) => {
    const { id } = req.params
    const {
        realm,
        user,
    } = req.body

    try {
        await updateUser(id, realm, user)
        res.status(200).send('User updated')
    } catch (error) {
        res.status(500).send('Server Interbnal Error')
    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params
    const {
        realm,
    } = req.query

    try {
        const userDelete = await deleteUser(id, realm)
        res.status(200).send('User deleted')
    } catch (error) {
        res.status(500).send('Server Interbnal Error')
    }
})

export default router