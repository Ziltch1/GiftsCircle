import api from '../axios';

const GetAsoebiItemsApi = () => {
    return api.get('/asoebiItem/Get/All');
}

export {GetAsoebiItemsApi};
