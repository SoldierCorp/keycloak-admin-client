import { kcAdminClient } from './index.mjs'

export const getClients = (realm) => {
    return kcAdminClient.clients.find({ realm })
}

export const createClient = (realm, client) => {
    return kcAdminClient.clients.create({
        realm,
        ...client,
        adminUrl: 'http://localhost:3000/admin',
    })
}

export const updateClient = (id, realm, client) => {
    return kcAdminClient.clients.update(
        {
            realm,
            id,
        },
        {
            ...client,
            adminUrl: 'http://localhost:3000/admin/update',
        }
    )
}


export const deleteClient = (id, realm) => {
    return kcAdminClient.clients.del({
        realm,
        id,
    })
}

export const addRoleClient = (realm, role) => {
    return kcAdminClient.clients.createRole({
        ...role,
        realm,
    })
}