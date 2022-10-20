import { kcAdminClient } from './index.mjs'

export const getGroups = (realm) => {
    return kcAdminClient.groups.find({
        realm,
    });
}

export const createGroup = (realm, group) => {
    return kcAdminClient.groups.create({
        realm,
        ...group,
    });
}

export const updateGroup = (id, realm, group) => {
    return kcAdminClient.groups.update(
        {
            id,
            realm,
        },
        group
    );
}

export const deleteGroup = (id, realm) => {
    return kcAdminClient.groups.del({
        id,
        realm,
    });
}