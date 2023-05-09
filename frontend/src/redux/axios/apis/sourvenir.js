import api from '../axios'

const GetSourvenirItemsApi = () => {
    return api.get('/sourvenirItem/Get/All/')
}

const AddSourvenirApi = (id) => {
    return api.post('/sourvenirItem/create')
}

export {GetSourvenirItemsApi}