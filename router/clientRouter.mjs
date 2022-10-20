import express from 'express'

import {
    getClients,
    createClient,
    updateClient,
    deleteClient,
    addRoleClient,
} from '../keycloack/client.mjs'

const router = express.Router()


router.get('/clients', async (req, res) => {
    const {
        realm,
    } = req.query

    try {
        const clients = await getClients(realm)
        res.json(clients)
    } catch {
        res.status(404).send('Cleint Not found')
    }
})

router.post('/clients', async (req, res) => {
    const {
        realm,
        client,
    } = req.body
    try {
        const clientCreate = await createClient(realm, client)
        res.status(200).json({
            message: 'Client created',
            clientId: clientCreate.id,
        })
    } catch {
        res.status(500).send('Cleint Not created')

    }
})

router.put('/clients/:id', async (req, res) => {
    const { id } = req.params
    const {
        realm,
        client,
    } = req.body
    try {
        const clientUpdate = await updateClient(id, realm, client)
        res.status(200).json({
            message: 'Client updated',
            clientId: clientUpdate.id,
        })
    } catch {
        res.status(500).send('Cleint Not updated')
    }
})

router.delete('/clients/:id', async (req, res) => {
    const { id } = req.params
    const {
        realm,
    } = req.body
    try {
        const clientDelete = await deleteClient(id, realm)
        res.status(200).json({
            message: 'Client deleted',
            clientId: clientDelete.id,
        })
    } catch {
        res.status(500).send('Cleint Not deleted')
    }
})

router.post('/clients/roles', async (req, res) => {
    const {
        realm,
        role,
    } = req.body
    console.log('realm', realm)
    console.log('role', role)
    try {
        const roleCreate = await addRoleClient(realm, role)
        res.status(200).json({
            message: 'Role created',
            roleId: roleCreate.id,
        })
    } catch (error) {
        console.log('error', error.message)
        res.status(500).send('Role Not created')
    }
})



export default router