import { kcAdminClient } from './index.mjs'

// f71a5200-c815-4e60-96e8-57878517ddcd

export const createRole = (realm, role) => {
    return kcAdminClient.roles.create({
        ...role,
        realm,
    })
}

// export const createPolicy = (clientId, type, realm, name) => {
//     return kcAdminClient.clients.createPolicy({
//         id: "f71a5200-c815-4e60-96e8-57878517ddcd",
//         type: "role",
//         realm: "v2x-utility-pf"
//     }, {
//         name: "NewPolicy",
//         roles: [{
//             id: "28dce926-7293-4817-b2f8-8d4c24caa51d",
//             required: true,
//         }]
//     })
// }

/**
 * 1: Crear un Client, setear Access Type = confidential y habilitar Authorization Enabled
 * 
 * 2: 
 * 
 * 
 */


export const createResource = async (realm, resource) => {

    const policies = await kcAdminClient.clients.createPolicy({
        id: "f71a5200-c815-4e60-96e8-57878517ddcd",
        type: "role",
        realm: "v2x-utility-pf"
    }, {
        name: "NewPolicy",
        roles: [{
            id: "28dce926-7293-4817-b2f8-8d4c24caa51d",
            required: true,
        }]
    })

    const resources = await kcAdminClient.clients.createResource(
        {
            id: 'f71a5200-c815-4e60-96e8-57878517ddcd',
            realm: 'v2x-utility-pf',
        },
        {
            name: 'NewResource',
            scopes: [
                {
                    name: 'NewScope',
                }
            ],
        }
    )

    console.log('policies: ', policies)
    console.log('resources: ', resources)
    const permissions = await kcAdminClient.clients.createPermission({
        id: "f71a5200-c815-4e60-96e8-57878517ddcd",
        type: "scope",
        realm: "v2x-utility-pf",
    }, {
        name: "NewPermission",
        resources: [resources._id],
        scopes: resources.scopes.map((scope) => scope.id),
        policies: [policies.id],
    })

    const addRoolToUser = await kcAdminClient.users.addRealmRoleMappings({
        id: '3218c51e-3e60-4997-adca-161c990792c0',
        realm: 'v2x-utility-pf',
        roles: [{
            id: '28dce926-7293-4817-b2f8-8d4c24caa51d',
            name: 'api-role',
        }]
    })

    console.log('addRoolToUser: ', addRoolToUser)


    console.log('permissions: ', permissions)
    return {
        policies,
        resources,
        permissions,
        addRoolToUser,
    }
}