import express from 'express'

import {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
} from '../keycloack/groups.mjs'

const router = express.Router()

router.get('/groups', async (req, res) => {
    const {
        realm,
    } = req.query

    try {
        const groups = await getGroups(realm)
        res.json(groups)
    } catch {
        res.status(404).send('Realm Not found')
    }
})

router.post('/groups', async (req, res) => {
    const {
        realm,
        group,
    } = req.body
    try {
        const groupCreate = await createGroup(realm, group)
        res.status(200).json({
            message: 'Group created',
            groupId: groupCreate.id,
        })
    } catch {
        res.status(500).send('Server Interbnal Error')
    }
})

router.put('/groups/:id', async (req, res) => {
    const { id } = req.params
    const {
        realm,
        group,
    } = req.body

    try {
        await updateGroup(id, realm, group)
        res.status(200).send('Group updated')
    } catch (error) {
        res.status(500).send('Server Interbnal Error')
    }
})

router.delete('/groups/:id', async (req, res) => {
    const { id } = req.params
    const {
        realm,
    } = req.query

    try {
        await deleteGroup(id, realm)
        res.status(200).send('Group deleted')
    } catch (error) {
        res.status(500).send('Server Interbnal Error')
    }
})

export default router