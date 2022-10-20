import { kcAdminClient } from './index.mjs';

export const getUsers = (realm) => {
    return kcAdminClient.users.find({
        realm,
    });
}

export const createUser = (realm, user) => {
    return kcAdminClient.users.create({
        realm,
        ...user,
    });
}

export const updateUser = (id, realm, user) => {
    return kcAdminClient.users.update(
        {
            id,
            realm,
        },
        user
    );
}

export const deleteUser = (id, realm) => {
    return kcAdminClient.users.del({
        id,
        realm,
    });
}