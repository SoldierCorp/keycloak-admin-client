import express from 'express'

import {
    createRole,
    createResource,
} from '../keycloack/resource.mjs'


const router = express.Router()


router.post('/roles', async (req, res) => {
    const {
        role,
        realm,
    } = req.body

    console.log('req.body: ', req.body)

    try {
        const result = await createRole(realm, role)
        res.status(200).json(result)
    }
    catch (error) {
        // console.log('error: ', error)
        res.status(500).json(error)
    }
})

router.post('/resource', async (req, res) => {
    // const {
    //     role,
    //     realm,
    // } = req.body

    try {
        const result = await createResource()
        res.status(200).json(result)
    }
    catch (error) {
        console.log('error: ', error.message)
        res.status(500).json(error)
    }
})

// create resource






export default router