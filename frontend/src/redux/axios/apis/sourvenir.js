import api from '../axios'

const GetSourvenirApi = () => {
    return api.get('/sourvenirItem/Get/All/')
}

const AddSourvenirApi = (data) => {
    return api.post(`/sourvenir/createMany`, data)
}


export {GetSourvenirApi, AddSourvenirApi}