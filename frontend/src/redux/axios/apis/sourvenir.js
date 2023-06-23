import api from '../axios'

const GetSourvenirApi = () => {
    return api.get('/sourvenirItem/Get/All/')
}

const AddSourvenirApi = (data) => {
    return api.post(`/sourvenir/createMany`, data)
}

const GetUserSourvenirApi = (id) => {
    return api.get(`/sourvenir/Get/UserSourvenir/${id}`)
}

export {GetSourvenirApi, GetUserSourvenirApi, AddSourvenirApi}